import React from 'react'
import { Stack, Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{
        animation: 'slide_from_left',
        animationDuration: 800, 
        contentStyle: {
          backgroundColor: Colors.background, 
        },
        headerShown: false, 
    }} >
        <Stack.Screen name='login' /> 
    </Stack>
  )
}

export default AuthLayout; 