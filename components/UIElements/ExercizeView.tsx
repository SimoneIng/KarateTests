import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ExercizeWithReps } from '@/database/types'
import { texts } from '@/styles/texts'
import CustomButton from '../utils/CustomButton'

interface ExercizeProps {
    exercize: ExercizeWithReps
}

const ExercizeView = ({ exercize }: ExercizeProps) => {

  const addExercizeRep = () => {
    alert('to implement')
  }

  const removeExercizeRep = () => {
    if(exercize.reps <= 1) return; 
    alert('to implement')
  }

  const deleteExercize = () => {
    alert('to implement')
  }

  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[texts.label]}>Esercizio: {exercize.name}</Text>
        <Text style={[texts.subLabel, {marginLeft: 10, marginVertical: 10}]}>Numero di Ripetizioni: </Text>
      </View>

      <View style={[styles.row]}>
        <CustomButton title='Aggiungi' size='medium' handleClick={addExercizeRep} />
        <Text style={[texts.subLabel]}>{exercize.reps}</Text>
        <CustomButton title='Rimuovi' size='medium' handleClick={removeExercizeRep} /> 
      </View>

      <View>
        <CustomButton title='Elimina Esercizio' size='medium' handleClick={deleteExercize} /> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    justifyContent: 'flex-start', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 20,
  }
})

export default ExercizeView