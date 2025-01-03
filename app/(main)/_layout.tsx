import CustomHeader from "@/components/headers/CustomHeader";
import GroupsHeader from "@/components/headers/GroupsHeader";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useDBStore } from "@/database/state";
import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

const MainLayout = () => {

  const { isLoadingAthletes, 
    isLoadingGroups, 
    isLoadingTests, 
    fetchAthletes,
    fetchGroups, 
    fetchTestTypes, 
    fetchTests,
    initRealtimeSubscriptions 
  } = useDBStore(); 

  useEffect(() => {
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
        <Stack.Screen name='groups' options={{
          header: () => <GroupsHeader />, 
        }} /> 
        <Stack.Screen name='group/[id]' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        /> 
        <Stack.Screen name='athlete/[id]' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        /> 
        <Stack.Screen name='modals/newTest' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        /> 
        <Stack.Screen name='modals/newAthlete' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        />
        <Stack.Screen name='modals/newGroup' options={{
          header: () => <CustomHeader />, 
          presentation: 'fullScreenModal',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        />
    </Stack>
  )
}

export default MainLayout; 