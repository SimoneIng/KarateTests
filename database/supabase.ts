import { createClient } from '@supabase/supabase-js'; 
import { SUPABASE_URL, SUPABASE_KEY } from '@env'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export const supabase = createClient(
    SUPABASE_URL, 
    SUPABASE_KEY,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true, // Aggiorna automaticamente i token scaduti
            persistSession: true,   // Salva automaticamente la sessione
            detectSessionInUrl: false, // Necessario solo per applicazioni web
        }
    }
); 