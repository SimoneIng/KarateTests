import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import GroupsList from '@/components/lists/GroupsList'
import { useAuthStore, useDBStore } from '@/database/state'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import FixedButton from '@/components/utils/FixedButton'

const HomeScreen = () => {

  const { groups } = useDBStore();
  const { role } = useAuthStore(); 

  useEffect(() => {
  
  }, [groups]); 

  const handleNewGroupPress = () => {
    router.push('/modals/newGroup');
  }

  return (
    <View style={[styles.page, { backgroundColor: Colors.background }]}>
      <GroupsList data={groups} /> 
      {role === 'coach' || role === 'admin' && 
        (
          <FixedButton onClick={handleNewGroupPress} />
        )
      } 
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 30
  },
})

export default HomeScreen; 

