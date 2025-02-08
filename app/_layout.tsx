import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/constants/Colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync(); 


const RootLayout = () => {
  return (
    <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.background
        }
    }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(auth)' />
        <Stack.Screen name='(main)' /> 
    </Stack>
  )
}

const AppLayout = () => {

  const [loaded] = useFonts({
    'RobotoExtraLight': require('../assets/fonts/RobotoMono-ExtraLight.ttf'),  
    'RobotoLigtht': require('../assets/fonts/RobotoMono-Light.ttf'), 
    'RobotoRegular': require('../assets/fonts/RobotoMono-Regular.ttf'), 
    'RobotoMedium': require('../assets/fonts/RobotoMono-Medium.ttf'), 
    'RobotoBold': require('../assets/fonts/RobotoMono-Bold.ttf'), 
  }); 

  useEffect(() => {
    if(loaded){
      SplashScreen.hideAsync(); 
    }
  }, [loaded]); 
  
  if(!loaded){
    return null; 
  }

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <RootLayout />
        <StatusBar backgroundColor={Colors.background} style='light' /> 
      </GestureHandlerRootView>
    </>
  )

}

export default AppLayout; 