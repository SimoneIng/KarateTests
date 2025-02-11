import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import GroupsList from '../lists/GroupsList'
import CustomButton from '../utils/CustomButton'
import { useDBStore, useAuthStore } from '@/database/state'
import { router } from 'expo-router'
import ExercizesList from '../lists/ExercizeGroupList'
import CustomBottomSheet from '../utils/BottomSheet'
import NewExercizeGroupForm from '../forms/NewExercizeGroupForm'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Exercizes = () => {

    const { exercizeGroups, fetchExercizeGroups, fetchMetricTypes } = useDBStore();
    const { role } = useAuthStore();

    useEffect(() => {
      fetchMetricTypes()
    }, [])

    useEffect(() => {
        fetchExercizeGroups()
    }, [exercizeGroups])

    const handleExercizeGroupClick = (id: number) => {
      router.push(`/exercize/${id.toString()}`); 
    }

    const handleNewExercizeGroup = () => {
      router.push('/modals/newExercizeGroup')
    }

    return (
      <View> 
          <View style={styles.row}>
              <Text style={[texts.subTitle]}>Esercizi</Text>
              {role === 'coach' || role === 'admin' && 
                    (
                      <CustomButton title='Aggiungi' size='small' handleClick={handleNewExercizeGroup} icon='add' /> 
                    )
              } 
          </View>

          <ExercizesList exercizeGroups={exercizeGroups} onClick={handleExercizeGroupClick} />
          
      </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10, 
      },
})

export default Exercizes; 