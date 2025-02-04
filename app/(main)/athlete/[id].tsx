import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { router, useLocalSearchParams } from 'expo-router';
import { useDBStore } from '@/database/state';
import { Athlete, Test } from '@/database/types';
import TestsList from '@/components/lists/TestsList';
import { Colors } from '@/constants/Colors';
import Statistics from '@/components/utils/Statistics';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/utils/CustomButton';

const AthleteScreen = () => {

  const { id } = useLocalSearchParams(); 
  const { athletes, tests } = useDBStore(); 
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [athleteTests, setAthleteTests] = useState<Test[]>([]); 

  useEffect(() => {
    const athlete_id = parseInt(id as string); 
    const athlete = athletes.find(athlete => athlete.athlete_id === athlete_id);
    if(athlete !== undefined){
      setAthlete(athlete)
      const atTests = tests.filter(test => test.athlete_id === athlete.athlete_id)
      setAthleteTests(atTests)
    }
  }, [tests]); 

  const getLatestTests = (): Test[] => {
    return athleteTests.sort((a, b) => new Date(a.test_date).getMilliseconds() - new Date(b.test_date).getMilliseconds()).slice(0, 2)
  }

  const handleNewTestPress = () => {
    router.push({
      pathname: '/modals/newTest', 
      params: {
        id: athlete?.athlete_id,
        name: athlete?.firstname + ' ' + athlete?.lastname
      }
    }); 
  }

  const handleTestPress = (id: number) => {
    router.push(`/test/${id}`)
  }

  const handleTestLongPress = (id: number) => {
    alert('long press')
  }

  const handleIconPress = () => {
    alert('change icon')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.page, {  backgroundColor: Colors.background }]}>
      
      <View style={[{alignItems: 'center'}]}>
        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons name='person-circle' size={108} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={[{gap: 15, marginVertical: 5}]}>
        <Text style={[texts.title, styles.textCenter, { color: Colors.primary }]}>{athlete?.firstname} {athlete?.lastname}</Text>
        <Text style={[texts.subLabel, styles.textCenter, { color: Colors.primary }]}>Data di Nascita: {athlete?.birthdate.toString()}</Text>
      </View>

      <View style={[{gap: 0, flex: 1, marginTop: 40}]}>
        <Text style={[texts.label, { color: Colors.primary }]}>Statistiche</Text>
        <Statistics tests={getLatestTests()} /> 
      </View>   
      
      <View style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 0 }]}>
        <Text style={[texts.label, { color: Colors.primary }]}>Test effettuati</Text>
        <CustomButton title='Aggiungi' size='small' icon='add' handleClick={handleNewTestPress} /> 
      </View>   
      
      <TestsList data={athleteTests} onItemPress={handleTestPress} onItemLongPress={handleTestLongPress} />
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 10,
    paddingTop: 30,
  }, 
  textCenter: {
    textAlign: 'center'
  },
})

export default AthleteScreen; 