import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/database/state';
import { ActivityIndicator, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import * as Updates from 'expo-updates'; 
import { texts } from '@/styles/texts';

const AppRoot = () => {

    async function checkForUpdates() {
        try {
          const update = await Updates.checkForUpdateAsync();
          
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            // Riavvia l'app per applicare l'aggiornamento
            await Updates.reloadAsync();
          }
        } catch (error) {
          // Gestione degli errori
          console.error('Errore durante il controllo degli aggiornamenti:', error);
        }
    }

    const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

    useEffect(() => {
        async function checkUpdate() {
          setIsCheckingUpdate(true);
          try {
            // Verifica se siamo in modalità development
            if (!__DEV__) {
              await checkForUpdates();
            }
          } finally {
            setIsCheckingUpdate(false);
          }
        }
        
        checkUpdate();
    }, []);

    if (isCheckingUpdate) {
        return (
          // Mostra un loader o splash screen mentre verifica gli aggiornamenti
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }

    return <App />

}

const App = () => {

    const { user, loading, fetchUser } = useAuthStore()

    useEffect(() => {
      if(!loading && !user){
        fetchUser()    
      }
    }, [user]); // Cambia solo quando `user` o `loading` cambiano


    if(loading){
        return (
            <View style={{
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: Colors.background
            }}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if(user){
        return (
            <Redirect href='/home' /> 
        )
    } else {
        return (
            <Redirect href='/login' />
        )
    }

}

export default AppRoot; 