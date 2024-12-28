import CustomHeader from "@/components/headers/CustomHeader";
import GroupsHeader from "@/components/headers/GroupsHeader";
import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack 
      screenOptions={{
        animation: 'fade',
        animationDuration: 700, 
        headerShown: true,
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
          presentation: 'formSheet',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        /> 
        <Stack.Screen name='modals/newTest' options={{
          presentation: 'formSheet',
          animation: 'slide_from_right',
          animationDuration: 900
          }} 
        /> 
    </Stack>
  )
}

export default MainLayout; 