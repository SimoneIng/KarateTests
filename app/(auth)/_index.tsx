import React from 'react'
import { Stack, Tabs } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{
        animation: 'slide_from_left',
        animationDuration: 800, 
    }} >
        <Stack.Screen name='login' /> 
    </Stack>
  )
}

export default AuthLayout; 