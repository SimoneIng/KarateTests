import { create } from 'zustand';
import { supabase } from './supabase'; // Assicurati che supabaseClient sia configurato correttamente
import { Athlete, AthleteGroup } from './types'

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
  tests: [], 
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

const useDBStore = create<DatabaseState>((set, get)=> ({
  groups: [], 
  athletes: [], 
  tests: [], 

}));

export { useAuthStore, useDBStore };
