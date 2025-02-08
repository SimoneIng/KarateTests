import { create } from 'zustand';
import { supabase } from './supabase'; // Assicurati che supabaseClient sia configurato correttamente
import { Athlete, AthleteGroup, Exercize, ExercizeGroup, ExercizeWithReps, Test, TestType } from './types'
import { RealtimeChannel } from '@supabase/supabase-js';

// Definisci i tipi per l'utente e lo stato di autenticazione
interface User {
  email: string;
  uid: string 
}

interface AuthState {
  user: User | null;
  loading: boolean;
  role: string | null; 
  login: (email: string, password: string) => Promise<void>;
  getRole: () => Promise<void>; 
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

interface DatabaseState {
  groups: AthleteGroup[], 
  athletes: Athlete[], 
  tests: Test[], 
  test_types: TestType[], 
  exercizeGroups: ExercizeGroup[], 

  isLoadingGroups: boolean,
  isLoadingAthletes: boolean, 
  isLoadingTests: boolean, 
  isLoadingExercizeGroups: boolean, 


  subscriptions: RealtimeChannel[], 
  initRealtimeSubscriptions: () => void, 
  
  fetchTestTypes: () => Promise<void>, 
  fetchGroups: () => Promise<void>, 
  fetchAthletes: () => Promise<void>, 
  fetchTests: () => Promise<void>,
  fetchExercizeGroups: () => Promise<void>, 

  getTestById: (id: number) => Test | undefined; 
  getTestsByAthleteId: (id: number) => Test[]; 

  addTest: (athlete_id: number, type: string, testValues: any, date: Date) => Promise<void>, 
  addAthlete: (firstname: string, lastname: string, birthdate: Date, groupId: number) => Promise<void>, 
  addAthleteGroup: (groupName: string) => Promise<void>, 
  addExercizeGroup: (title: string) => Promise<void>, 
  addExercizeToExercizeGroup: (exercizeGroupId: number) => Promise<void>, 

  removeTest: (testId: number) => Promise<void>, 
  removeAthlete: (athleteId: number) => Promise<void>, 
  removeAthleteGroup: (groupId: number) => Promise<void>, 
  removeExercizeGroup: (exercizeGroupId: number) => Promise<void>, 
  removeExercizeFromExercizeGroup: (exercizeGroupId: number, exercizeId: number) => Promise<void>,


  updateExercize: (currentExercize: Exercize, updatedExercize: Exercize) => Promise<void>, 

}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null, // Stato dell'utente, inizialmente null
  loading: false, // Stato di caricamento per operazioni come login/logout
  role: null, 

  login: async (email, password) => {
    set({ loading: true });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user.email) {
        // Estrai solo le proprietà necessarie (id, email, ecc.)
        const user: User = {
          email: data.user.email,
          uid: data.user.id, 
        };
  
        // Imposta lo stato dell'utente nello store
        set({ user: user, loading: false });
      } else {
        set({ user: null, loading: false });
      }

    } catch (error) {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      set({ user: null, role: null });
    } catch (error) {
      console.error(error);
    }
  },

  fetchUser: async () => {
    
    set({ loading: true })

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      if(data.session?.user.email && data.session.user.id){

        const user: User = {
          email: data.session.user.email,
          uid: data.session.user.id
        }

        set({ user: user });
      } else {
        set({ user: null }); 
      }

    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false })
    }
  },

  getRole: async () => {
    set({  loading: true }); 

    try {
      const user = get().user; 

      if(!user){
        set({ role: 'athlete' }); 
      } else {
        const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.uid)
        .single();

        if(error) throw error; 
        set({ role: data.role })
      }
 
    } catch(error){
      console.log(error)
    } finally {
      set({ loading: false }); 
    }
  }

}));

const useDBStore = create<DatabaseState>((set, get) => ({
  groups: [],
  athletes: [],
  tests: [],
  test_types: [],
  exercizeGroups: [], 

  isLoadingGroups: false,
  isLoadingAthletes: false,
  isLoadingTests: false,
  isLoadingExercizeGroups: false, 

  subscriptions: [], // Array per tenere traccia delle subscription

  // Fetch iniziale dei dati
  fetchTestTypes: async () => {
    try {
      const { data, error } = await supabase.rpc('get_test_type_values');

      if (error) throw error;

      set({ test_types: data });
    } catch (error) {
      console.log(error);
    }
  },

  fetchGroups: async () => {
    set({ isLoadingGroups: true });

    try {
      const { data, error } = await supabase.from('athlete_group').select('*');

      if (error) throw error;

      set({ groups: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoadingGroups: false });
    }
  },

  fetchAthletes: async () => {
    set({ isLoadingAthletes: true });

    try {
      const { data, error } = await supabase.from('athlete').select('*');

      if (error) throw error;

      set({ athletes: data });
    } catch (error) {
      console.log('error');
    } finally {
      set({ isLoadingAthletes: false });
    }
  },

  fetchTests: async () => {
    set({ isLoadingTests: true });

    try {
      const { data, error } = await supabase.from('test').select('*');

      if (error) throw error;

      set({ tests: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoadingTests: false });
    }
  },

  fetchExercizeGroups: async () => {
    set({ isLoadingExercizeGroups: true });
  
    try {
      // Query con Supabase
      const { data, error } = await supabase
        .from('exercize_group')
        .select(`
          id,
          title,
          exercize_in_group (
            exercize_id,
            exercize (
              id, name, type, metric, comparison
            )
          )
        `);
  
      if (error) throw error;
  
      // Formattazione dei dati per TypeScript
      const formattedData: ExercizeGroup[] = data.map(group => ({
        id: group.id,
        title: group.title,
        exercizes: group.exercize_in_group.reduce((acc: ExercizeWithReps[], eig: any) => {
          const existingExercize = acc.find(ex => ex.id === eig.exercize.id);
          if (existingExercize) {
            existingExercize.reps += 1;
          } else {
            acc.push({
              id: eig.exercize.id,
              name: eig.exercize.name,
              type: eig.exercize.type,
              metric: eig.exercize.metric,
              comparision: eig.exercize.comparison,
              reps: 1,
            });
          }
          return acc;
        }, [])
      }));
  
      set({ exercizeGroups: formattedData });
    } catch (error) {
      console.error('Error fetching exercize groups:', error);
    } finally {
      set({ isLoadingExercizeGroups: false });
    }
  }, 

  addTest: async (athlete_id: number, type: string, testValues: any, date: Date) => {
    try {
      const { data, error } = await supabase
      .from('test')
      .insert([{
        athlete_id: athlete_id,
        test_values: testValues, 
        test_date: date, 
        type: type, 
      }])
      .select()

      if(error) throw error;

      set((state) => {
        return { tests: [...state.tests, data[0] as Test] }
      }); 

    } catch(error) {
        console.log('error', error); 
    }
  }, 

  addAthlete: async (firstname: string, lastname: string, birthdate: Date, groupId: number) => {
    try {
      const { data, error } = await supabase
      .from('athlete')
      .insert([{
        firstname: firstname, 
        lastname: lastname, 
        birthdate: birthdate, 
        group_id: groupId
      }])
      .select()

      if(error) throw error; 

      set((state) => {
        return { athletes: [...state.athletes, data[0] as Athlete] }
      }); 

    } catch (error) {
        console.log('error', error); 
     }
  }, 

  addAthleteGroup: async (groupName: string) => {
    try {
      const { data, error } = await supabase
      .from('athlete_group')
      .insert([{
        group_name: groupName, 
      }])
      .select() 

      if(error) throw error; 

      set((state) => {
        return { groups: [...state.groups, data[0] as AthleteGroup] }
      })

    } catch(error) {
      console.log('error', error); 
    }
  },

  addExercizeGroup: async (title: string) => {
    // scrivi
  }, 

  addExercizeToExercizeGroup: async (exercizeGroupId: number) => {
    // scrivi
  }, 

  removeTest: async (testId: number) => {
    try {
      const { error } = await supabase
      .from('test')
      .delete()
      .eq('test_id', testId) 

      if(error) throw error; 

      set((state) => { 
        const updatedTest = state.tests.filter(test => test.test_id !== testId); 
        return { tests: updatedTest }
      }); 

    } catch(error) {
      console.log('Error', error); 
    }
  }, 

  removeAthlete: async (athleteId: number) => {
    try {
      const { error } = await supabase
      .from('athlete')
      .delete()
      .eq('athlete_id', athleteId) 

      if(error) throw error; 

      set((state) => { 
        const updatedAthletes = state.athletes.filter(at => at.athlete_id !== athleteId); 
        return { athletes: updatedAthletes }
      }); 

    } catch(error) {
      console.log('Error', error); 
    }
  }, 

  removeAthleteGroup: async (groupId: number) => {
    try {
      const { error } = await supabase
      .from('athlete_group')
      .delete()
      .eq('group_id', groupId) 

      if(error) throw error; 

      set((state) => { 
        const updatedGroups = state.groups.filter(gr => gr.group_id !== groupId); 
        return { groups: updatedGroups }
      }); 

    } catch(error) {
      console.log('Error', error); 
    }
  },

  removeExercizeGroup: async (exercizeGroupId: number) => {
    // scrivi
  },

  removeExercizeFromExercizeGroup: async (exercizeGroupId: number, exercizeId: number) => {
    // scrivi
  },

  getTestById: (id: number) => {
    return get().tests.find(test => test.test_id === id)
  },

  getTestsByAthleteId: (id: number) => {
    return get().tests.filter(test => test.athlete_id === id); 
  }, 

  updateExercize: async (currentExercize: Exercize, updatedExercize: Exercize) => {
    // scrivi
  }, 

  // Inizializza le subscription per gli aggiornamenti realtime
  initRealtimeSubscriptions: () => {

    const channels: RealtimeChannel[] = []; 

    const groupChannels = supabase.channel('group-channel')
    .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'athlete_group' },
    (payload) => {
      console.log('Change Received', payload); 
      const { eventType, new: newRecord, old: oldRecord } = payload; 

      set((state) => {
        let updatedGroups = [...state.groups];
        switch (eventType) {
          case 'INSERT':
            if(state.groups.findIndex(group => group.group_id === newRecord.group_id) === -1){
              updatedGroups.push(newRecord as AthleteGroup);
            }
            break;
          case 'UPDATE':
            updatedGroups = updatedGroups.map((group) =>
              group.group_id === newRecord.group_id ? newRecord as AthleteGroup : group
            );
            break;
          case 'DELETE':
            updatedGroups = updatedGroups.filter((group) => group.group_id !== oldRecord.group_id);
            break;
        }
        return { groups: updatedGroups };
      });

    }
    ).subscribe();

    const athleteChannels = supabase.channel('athlete-channel')
    .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'athlete' },
    (payload) => {
      console.log('Chage Received', payload); 
      const { eventType, new: newRecord, old: oldRecord } = payload; 

      set((state) => {
        let updatedAthletes = [...state.athletes];
        switch (eventType) {
          case 'INSERT':
            if(state.athletes.findIndex(athlete => athlete.athlete_id === newRecord.athlete_id) === -1){
              updatedAthletes.push(newRecord as Athlete);
            }
            break;
          case 'UPDATE':
            updatedAthletes = updatedAthletes.map((athlete) =>
              athlete.athlete_id === newRecord.athlete_id ? newRecord as Athlete : athlete
            );
            break;
          case 'DELETE':
            updatedAthletes = updatedAthletes.filter((athlete) => athlete.athlete_id !== oldRecord.athlete_id);
            break;
        }
        return { athletes: updatedAthletes };
      });

    }
    ).subscribe(); 

    const testChannels = supabase.channel('test-channel')
    .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'test' },
    (payload) => {
      console.log('Chage Received', payload); 
      const { eventType, new: newRecord, old: oldRecord } = payload;

      set((state) => {
        let updatedTests = [...state.tests]; 
        
        switch(eventType){
          case 'INSERT': 
          if(state.tests.findIndex(test => test.test_id === newRecord.test_id) === -1){
            updatedTests.push(newRecord as Test)
          }
          break; 
          case 'UPDATE': 
            updatedTests = updatedTests.map((test) => 
              test.test_id === newRecord.test_id ? newRecord as Test : test 
            )
          break; 
          case 'DELETE':  
            updatedTests = updatedTests.filter((test) => test.test_id !== oldRecord.test_id); 
          break; 
        }

        return { tests: updatedTests }; 
      })
    }
    ).subscribe();

    channels.push(groupChannels, athleteChannels, testChannels); 

    set({ subscriptions: channels }); 
  },

}));


export { useAuthStore, useDBStore };
