import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GroupsList from '@/components/lists/GroupsList'
import { useDBStore } from '@/database/state'
import { supabase } from '@/database/supabase'
import { AthleteGroup } from '@/database/types'
import { texts } from '@/styles/texts'
import { Ionicons } from '@expo/vector-icons'

const HomeScreen = () => {

  const { groups } = useDBStore();

  const [athleteGroups, setAthleteGroups] = useState<AthleteGroup[]>([])

  const fetchAthleteGroups = async () => {
    const { data, error } = await supabase
    .from('athlete_group')
    .select('*'); 

    if(data){
      setAthleteGroups(data as AthleteGroup[]); 
    } else {
      return null; 
    }
  }

  useEffect(() => {
    fetchAthleteGroups() 
  }, [])

  const handleNewGroupPress = () => {
    
  }

  return (
    <SafeAreaView style={[styles.page]}>
      
      <GroupsList data={athleteGroups} /> 
      <TouchableOpacity
        style={[styles.button]}
        onPress={handleNewGroupPress}
      > 
        <Ionicons name='add-circle' size={32} color='#fff' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#001d3d',
    flex: 1, 
    paddingHorizontal: 20
  },
  title: {
    color: 'white'
  },
  button: {
    position: 'absolute', 
    bottom: 60, 
    right: 20, 
    zIndex: 10, 
    borderRadius: 10,
    padding: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#ccc'
  }
})

export default HomeScreen; 

function useDatabaseStore() {
  throw new Error('Function not implemented.')
}
