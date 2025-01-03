import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';

interface Props {
    title: string, 
    handleClick: () => void; 
}

const CustomButton = ({ title, handleClick }: Props) => {
  return (
      <TouchableOpacity
      onPress={handleClick}
      style={[styles.button]}
      >
        <Text style={[texts.label, styles.buttonText, {  color: Colors.primary }]}>{title}</Text>
      </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
    button: {
        padding: 15, 
        borderRadius: 10,
        backgroundColor: Colors.cardBackground, 
        margin: 10
      },
      buttonText: {
        textAlign: 'center',
      }
})

export default CustomButton; 