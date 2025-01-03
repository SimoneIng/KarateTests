import { create } from 'zustand';
import { supabase } from './supabase'; // Assicurati che supabaseClient sia configurato correttamente
import { Athlete, AthleteGroup, Test, TestType } from './types'
import { RealtimeChannel } from '@supabase/supabase-js';

// Definisci i tipi per l'utente e lo stato di autenticazione
interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

interface DatabaseState {
  groups: AthleteGroup[], 
  athletes: Athlete[], 
  tests: Test[], 
  test_types: TestType[], 

  isLoadingGroups: boolean,
  isLoadingAthletes: boolean, 
  isLoadingTests: boolean, 


  subscriptions: RealtimeChannel[], 
  initRealtimeSubscriptions: () => void, 
  
  fetchTestTypes: () => Promise<void>, 
  fetchGroups: () => Promise<void>, 
  fetchAthletes: () => Promise<void>, 
  fetchTests: () => Promise<void>
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null, // Stato dell'utente, inizialmente null
  loading: false, // Stato di caricamento per operazioni come login/logout
  
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
      set({ user: null });
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

      if(data.session?.user.email){

        const user: User = {
          email: data.session.user.email
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

}));

const useDBStore = create<DatabaseState>((set, get) => ({
  groups: [],
  athletes: [],
  tests: [],
  test_types: [],

  isLoadingGroups: false,
  isLoadingAthletes: false,
  isLoadingTests: false,

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

  // Inizializza le subscription per gli aggiornamenti realtime
  initRealtimeSubscriptions: () => {

    const channels: RealtimeChannel[] = []; 

    const groupChannels = supabase.channel('custom-all-channel')
    .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'athlete_group' },
    (payload) => {
      console.log('Change Received', payload); 
      const { eventType, new: newRecord, old: oldRecord } = payload; 

      switch(eventType){
        case 'INSERT': 
          console.log(newRecord)
        break; 

        case 'UPDATE': 
          
        break; 

        case 'DELETE': 
          console.log(oldRecord)
        break; 
      }

    }
    ).subscribe();

    const athleteChannels = supabase.channel('custom-all-channel')
    .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'athlete' },
    (payload) => {
      console.log('Chage Received', payload); 
    }
    ).subscribe(); 

    const testChannels = supabase.channel('custom-all-channel')
    .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'test' },
    (payload) => {
      console.log('Chage Received', payload); 
    }
    ).subscribe();

    channels.push(athleteChannels, testChannels, groupChannels)

    set({ subscriptions: channels }); 

  },
}));


export { useAuthStore, useDBStore };
