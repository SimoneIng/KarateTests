import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Athlete, Test } from '@/database/types'
import { texts } from '@/styles/texts'
import { Colors } from '@/constants/Colors'

const statistics = () => {
  return (
    <View style={[styles.page]}>
      <Text style={[texts.pageTitle, styles.text]}>Statistiche</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    marginHorizontal: 10,
    marginTop: 20
  },
  text: {
    color: Colors.primary
  }
})

export default statistics; 