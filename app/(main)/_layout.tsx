import CustomHeader from "@/components/headers/CustomHeader";
import HomeHeader from "@/components/headers/HomeHeader";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore, useDBStore } from "@/database/state";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import ModalHeader from "@/components/headers/ModalHeader";


const MainLayout = () => {

  const { 
    isLoadingAthletes, 
    isLoadingGroups, 
    isLoadingTests, 
    fetchAthletes,
    fetchGroups, 
    fetchTestTypes, 
    fetchTests,
    initRealtimeSubscriptions 
  } = useDBStore(); 

  const { getRole } = useAuthStore();

  useEffect(() => {
    getRole()
    fetchTestTypes()
    fetchAthletes()
    fetchGroups()
    fetchTests() 
    initRealtimeSubscriptions()
  }, []);

  if(isLoadingGroups || isLoadingAthletes || isLoadingTests){
    return (
      <View style={{
        flex: 1, 
        backgroundColor: Colors.background,
        justifyContent: 'center', 
      }}>
        <ActivityIndicator size='large' color={Colors.primary} />
        <StatusBar backgroundColor={Colors.background} style='light' />
      </View>
    )
  }

  return (

    <Stack 
      screenOptions={{
        animation: 'fade',
        animationDuration: 700, 
        headerShown: true,
        contentStyle: {
          backgroundColor: Colors.background
        }
      }}
    >
        <Stack.Screen name='home' options={{
          header: () => <HomeHeader />, 
        }} /> 
        <Stack.Screen name='group/[id]' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 100
          }} 
        /> 
        <Stack.Screen name='athlete/[id]' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 100
          }} 
        /> 
        <Stack.Screen name='test/[id]' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 100
          }} 
        />
        <Stack.Screen name="exercize/[id]" options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal', 
          animation: 'slide_from_right', 
          animationDuration: 100
        }}
        /> 
        <Stack.Screen name='modals/newTest' options={{
          header: () => <ModalHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 100
          }} 
        /> 
        <Stack.Screen name='modals/newAthlete' options={{
          header: () => <ModalHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 100
          }} 
        />
        <Stack.Screen name='modals/newGroup' options={{
          header: () => <ModalHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 100
          }} 
        />      
        <Stack.Screen name='settings/settings' options={{
          header: () => <ModalHeader />, 
          presentation: 'fullScreenModal', 
          animation: 'slide_from_right', 
          animationDuration: 100
          }}
        /> 
    </Stack>
  )
}

export default MainLayout; 