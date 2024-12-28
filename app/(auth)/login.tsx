import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts'
import LoginForm from '@/components/forms/LoginForm'
import { router } from 'expo-router'

const LoginScreen = () => {

  return (
    <View style={[styles.page]}>
      <Text style={[styles.text, texts.title]}>Login</Text>
      <LoginForm />
    </View>
  )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#001d3d',
        flex: 1, 
        justifyContent: 'center'
    },
    text: {
        color: 'white', 
        textAlign: 'center'
    }
})

export default LoginScreen; 