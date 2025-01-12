import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { router, useLocalSearchParams } from 'expo-router';
import { useDBStore } from '@/database/state';
import { Athlete, Test } from '@/database/types';
import FixedButton from '@/components/utils/FixedButton';
import TestsList from '@/components/lists/TestsList';
import { Colors } from '@/constants/Colors';
import Statistics from '@/components/utils/Statistics';

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

  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.page, {  backgroundColor: Colors.background }]}>
      
      <View style={[{gap: 15, marginVertical: 5}]}>
        <Text style={[texts.title, styles.textCenter, { color: Colors.primary }]}>{athlete?.firstname} {athlete?.lastname}</Text>
        <Text style={[texts.subLabel, styles.textCenter, { color: Colors.primary }]}>Data di Nascita: {athlete?.birthdate.toString()}</Text>
      </View>

      <View style={[{gap: 0, flex: 1, marginTop: 40}]}>
        <Text style={[texts.label, { color: Colors.primary }]}>Statistiche</Text>
        <Statistics tests={getLatestTests()} /> 
      </View>   
      
      <View style={[{gap: 10, flex: 1, marginHorizontal: 10 }]}>
        <Text style={[texts.label, { color: Colors.primary }]}>Test</Text>
        <TestsList data={athleteTests} />
      </View>   
      
    </ScrollView>
    <FixedButton onClick={handleNewTestPress} />
  </>
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