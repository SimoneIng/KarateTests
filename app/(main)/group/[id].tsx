import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthStore, useDBStore } from '@/database/state';
import { Athlete, AthleteGroup } from '@/database/types';
import AthletesList from '@/components/lists/AthletesList';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const GroupScreen = () => {

  const { id } = useLocalSearchParams(); 
  const { groups, athletes } = useDBStore(); 
  const { role } = useAuthStore(); 
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
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.page, { backgroundColor: Colors.background }]}>
      
      <View style={[styles.titleSection]}>
        <Text style={[texts.title]}>Gruppo {group?.group_name}</Text>
        <Text style={[texts.subLabel]}> Numero Atleti: {groupAthletes.length}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[texts.label]}>Atleti</Text>
        {role === 'coach' || role === 'admin' && 
          (
            <TouchableOpacity 
              onPress={handleNewAthletePress}
              style={styles.button}
            >
              <Text style={[texts.tinyLabel, {color: '#fff'}]}>Aggiungi</Text>
              <Ionicons name='add' size={14} color={'#fff'} /> 
            </TouchableOpacity>
          )
        } 
      </View>


      <AthletesList data={groupAthletes} /> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    paddingHorizontal: 10, 
    paddingTop: 30
  }, 
  titleSection: {
    padding: 20, 
  }, 
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    margin: 5
  }, 
  button: {
    flexDirection: 'row', 
    padding: 10, 
    gap: 10, 
    alignItems: 'center', 
    backgroundColor: 'black', 
    borderRadius: 8, 
  }
})

export default GroupScreen; 