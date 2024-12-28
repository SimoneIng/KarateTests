import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { texts } from '@/styles/texts'
import Ionicons from '@expo/vector-icons/Ionicons';
import useAuthStore from '@/database/state';
import { router } from 'expo-router';

const LoginForm = () => {

    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null); 

    const { login, loading } = useAuthStore(); 

    const handleSubmit = async () => {
        try{
            await login(email, password)
            router.replace('/'); 
        } catch(error) {
            console.log(error)
            setError("Errore...Riprovare.");
        }
    }

    if(loading){
        return (
            <View style={[styles.form]}>
                <ActivityIndicator size='large' color='#fff' /> 
            </View>
        )
    }

  return (
    <View style={[styles.form]}>

        <View style={styles.container}>
            <View style={[styles.inputContainer]}>
            <Text style={[styles.label, texts.label]}>Email</Text>
            <TextInput style={[styles.input, texts.subLabel]} 
                placeholder='Inserisci Email'
                placeholderTextColor='#ccc'
                onChangeText={(string) => setEmail(string)}
            />
            </View>

            <View style={[styles.inputContainer]}>
                <Text style={[styles.label, texts.label]}>Password</Text>
                <TextInput style={[styles.input, texts.subLabel]} 
                    placeholder='Inserisci Password'
                    placeholderTextColor='#ccc'
                    onChangeText={(string) => setPassword(string)}
                />
            </View>
        </View>

        {
            error && 
            <Text style={[styles.errorLabel, texts.tinyLabel]}>{error}</Text>
        }

        <TouchableOpacity style={[styles.button]}
            onPress={handleSubmit}
        >
            <Text style={[styles.label, texts.label]}>Accedi</Text>
            <Ionicons name='log-in-outline' size={28} color='#fff' />
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    form: {
        padding: 30,
        gap: 20
    }, 
    container: {
        gap: 10
    },
    inputContainer: {
        gap: 5,
    },
    input: {
        borderWidth: 0.5, 
        borderColor: '#ccc', 
        borderRadius: 10,
        padding: 10, 
        color: 'white'
    }, 
    button: {
        borderRadius: 10, 
        backgroundColor: '#06D6A0', 
        padding: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 10
    }, 
    label: {
        color: 'white'
    }, 
    errorLabel: {
        color: 'red'
    }
})

export default LoginForm; 

