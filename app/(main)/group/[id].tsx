import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { router, useLocalSearchParams } from 'expo-router';
import { useDBStore } from '@/database/state';
import { Athlete, AthleteGroup } from '@/database/types';
import AthletesList from '@/components/lists/AthletesList';
import FixedButton from '@/components/utils/FixedButton';
import { Colors } from '@/constants/Colors';

const GroupScreen = () => {

  const { id } = useLocalSearchParams(); 
  const { groups, athletes } = useDBStore(); 
  const [group, setGroup] = useState<AthleteGroup | null>(null); 
  const [groupAthletes, setGroupAthletes] = useState<Athlete[]>([]); 

  useEffect(() => {
    const group_id = parseInt(id as string); 
    const group = groups.find(group => group.group_id === group_id);
    if(group){
      setGroup(group)
      const atl = athletes.filter(athlete => athlete.group_id === group.group_id); 
      setGroupAthletes(atl); 
    }
  }, [athletes]); 

  const handleNewAthletePress = () => {
    router.push('/modals/newAthlete');
  }

  return (
    <View style={[styles.page, { backgroundColor: Colors.background }]}>
      <Text style={[texts.pageTitle, { color: Colors.primary }]}>Gruppo {group?.group_name}</Text>
      <AthletesList data={groupAthletes} /> 
      <FixedButton onClick={handleNewAthletePress} /> 
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    paddingHorizontal: 20, 
    gap: 20, 
    paddingTop: 30
  }, 
})

export default GroupScreen; 