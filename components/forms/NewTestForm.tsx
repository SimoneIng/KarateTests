import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts'
import { Colors } from '@/constants/Colors'
import CustomButton from '../utils/CustomButton'

const NewTestForm = () => {

  const handleSubmit = () => {
    
  }

  return (
    <View>
      <CustomButton title='Conferma' handleClick={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default NewTestForm; 