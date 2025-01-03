import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import GroupsList from '@/components/lists/GroupsList'
import { useDBStore } from '@/database/state'
import FixedButton from '@/components/utils/FixedButton'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

const HomeScreen = () => {

  const { groups } = useDBStore();

  useEffect(() => {

  }, []); 

  const handleNewGroupPress = () => {
    router.push('/modals/newGroup');
  }

  return (
    <View style={[styles.page, { backgroundColor: Colors.background }]}>
      <GroupsList data={groups} /> 
      <FixedButton onClick={handleNewGroupPress} />
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

