import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { texts } from '@/styles/texts'
import NewExercizeGroupForm from '@/components/forms/NewExercizeGroupForm'

const newExercizeGroup = () => {
  return (
    <View style={[styles.page]}>
      <Text style={[styles.text, texts.title]}>Nuovo Gruppo di Esercizi</Text>
      <NewExercizeGroupForm /> 
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.background,
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 30, 
    gap: 20,
  },
  text: {
    color: Colors.primary, 
    textAlign: 'center'
  }
})

export default newExercizeGroup;