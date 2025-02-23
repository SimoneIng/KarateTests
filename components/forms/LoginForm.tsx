import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { texts } from '@/styles/texts'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuthStore } from '@/database/state';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CustomInput from '../utils/CustomInput';
import CustomButton from '../utils/CustomButton';

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
            Alert.alert('Errore', error as string); 
            setError("Errore...Riprovare.");
        }
    }

    if(loading){
        return (
            <View style={[styles.form]}>
                <ActivityIndicator size='large' color={Colors.primary} /> 
            </View>
        )
    }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
     
    <View style={[styles.form]}>

        <View style={styles.container}>
            <View style={[styles.inputContainer]}>
            <Text style={[{ color: Colors.primary }, texts.label]}>Email</Text>
            <CustomInput placeholder='Inserisci Email' onChange={(string) => setEmail(string)} />
            </View>

            <View style={[styles.inputContainer]}>
                <Text style={[{ color: Colors.primary }, texts.label]}>Password</Text>
                <CustomInput placeholder='Inserisci Password' secureText={true} onChange={(string) => setPassword(string)} /> 
            </View>
        </View>

        {
            error && 
            <Text style={[{ color: Colors.primary }, texts.tinyLabel]}>{error}</Text>
        }

        <CustomButton 
            title='Accedi' 
            handleClick={handleSubmit}
            bgColor={Colors.accent}
            icon='log-in-outline'
            size='large'
        /> 

    </View>
    </KeyboardAvoidingView>

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
    button: {
        borderRadius: 10, 
        padding: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 10
    }
})

export default LoginForm; 

