import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { texts } from '@/styles/texts'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuthStore } from '@/database/state';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

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
            <TextInput style={[styles.input, texts.subLabel, { color: Colors.primary }]} 
                placeholder='Inserisci Email'
                placeholderTextColor={Colors.secondary}
                onChangeText={(string) => setEmail(string)}
            />
            </View>

            <View style={[styles.inputContainer]}>
                <Text style={[{ color: Colors.primary }, texts.label]}>Password</Text>
                <TextInput style={[styles.input, texts.subLabel, { color: Colors.primary }]} 
                    placeholder='Inserisci Password'
                    secureTextEntry={true}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(string) => setPassword(string)}
                />
            </View>
        </View>

        {
            error && 
            <Text style={[{ color: Colors.primary }, texts.tinyLabel]}>{error}</Text>
        }

        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.cardBackground }]}
            onPress={handleSubmit}
        >
            <Text style={[{ color: Colors.primary }, texts.label]}>Accedi</Text>
            <Ionicons name='log-in-outline' size={28} color={Colors.primary} />
        </TouchableOpacity>

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
    input: {
        borderWidth: 0.5, 
        borderColor: '#ccc', 
        borderRadius: 10,
        padding: 10, 
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

