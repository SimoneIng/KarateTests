import React, { useEffect } from 'react'
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/database/state';
import { ActivityIndicator, View } from 'react-native';

const App = () => {

    const { user, loading, fetchUser } = useAuthStore()

    useEffect(() => {
        if (!user && !loading) {
          fetchUser();
        }
      }, [user]); // Cambia solo quando `user` o `loading` cambiano


    if(loading){
        return (
            <View style={{
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#001d3d'
            }}>
                <ActivityIndicator size='large' color='#fff' />
            </View>
        )
    }

    if(user){
        return (
            <Redirect href='/groups' /> 
        )
    } else {
        return (
            <Redirect href='/login' />
        )
    }

}

export default App; 