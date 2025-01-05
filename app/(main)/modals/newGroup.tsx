import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { texts } from '@/styles/texts'
import NewGroupForm from '@/components/forms/NewGroupForm'

const newGroup = () => {
  return (
    <View style={[styles.page]}>
      <Text style={[styles.text, texts.pageTitle]}>Nuovo Gruppo</Text>
      <NewGroupForm /> 
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
  }
})

export default newGroup;