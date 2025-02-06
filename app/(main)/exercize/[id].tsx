import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthStore, useDBStore } from '@/database/state';
import { ExercizeGroup } from '@/database/types';
import { texts } from '@/styles/texts';
import ExercizeList from '@/components/lists/ExercizeList';

const ExercizeGroupScreen = () => {

  const { id } = useLocalSearchParams(); 
  const { role } = useAuthStore(); 
  const { exercizeGroups } = useDBStore(); 
  const [exercizeGroup, setExercizeGroup] = useState<ExercizeGroup | null>(null)

  useEffect(() => {
    const exercizeGroupId = parseInt(id as string);
    const exercizeGroup = exercizeGroups.find(exercizeGroup => exercizeGroup.id === exercizeGroupId);

    if(exercizeGroup){
      setExercizeGroup(exercizeGroup)
    } else {
      router.back(); 
    }

  }, [])
  
  return (
    <ScrollView style={styles.page}>
      <Text style={[texts.pageTitle]}>{exercizeGroup?.title}</Text>
      
      <View style={styles.subpage}>
        <Text style={[texts.label]}>Esercizi: </Text>

        <ExercizeList exercizeList={exercizeGroup ? exercizeGroup.exercizes : []} /> 

        {role && (
          <View>
            <Text>Aggiungi Esercizio</Text>
          </View>
        )}

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 10, 
  },
  subpage: {
    padding: 10, 
  }
})

export default ExercizeGroupScreen; 