import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import NewAthleteForm from '@/components/forms/NewAthleteForm';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';

const newAthlete = () => {
  return (
    <View style={[styles.page]}>
      <Text style={[texts.pageTitle, styles.text]}>Nuovo Atleta</Text>
      <NewAthleteForm />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.background,
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 30, 
    gap: 20
  },
  text: {
    color: Colors.primary, 

  }
})

export default newAthlete; 