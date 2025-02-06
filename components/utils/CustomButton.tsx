import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    title: string, 
    size?: "small" | "large" | 'medium', 
    bgColor?: string, 
    icon?: typeof Ionicons.defaultProps, 
    handleClick: () => void; 
}

const CustomButton = ({ title, handleClick, size, icon, bgColor }: Props) => {
  return (
      <TouchableOpacity
      onPress={handleClick}
      style={[styles.button, 
        { backgroundColor: 'black' }, 
        size == "large" && styles.large, 
        size == 'small' && styles.small,
        size == 'medium' && styles.medium
      ]}
      >
        <Text style={[size == 'medium' && texts.subLabel, size == 'large' && texts.label, size == 'small' && texts.tinyLabel, styles.buttonText, {  color: 'white' }]}>{title}</Text>
        {icon && (
          <Ionicons name={icon} size={size == 'large' ? 28 : 14} color='#fff' /> 
        )}
      </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center', 
        gap: 5
      },
      large: {
        padding: 15, 
        margin: 10
      },
      small: {
        padding: 10, 
        margin: 5
      }, 
      buttonText: {
        textAlign: 'center',
      },
      medium: {
        padding: 12, 
        margin: 7
      }
})

export default CustomButton; 