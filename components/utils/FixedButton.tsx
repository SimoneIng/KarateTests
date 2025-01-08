import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Props {
    onClick: () => void, 
}

const FixedButton = ({ onClick }: Props) => {
  return (
      <TouchableOpacity
        style={[styles.button]}
        onPress={onClick}
      > 
        <Ionicons name='add-circle' size={32} color={Colors.primary} />
      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    button: {
        position: 'absolute', 
        bottom: 60, 
        right: 20, 
        zIndex: 10, 
        borderRadius: 10,
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: Colors.cardBackground,
        borderWidth: 1, 
        borderColor: Colors.primary
    }
}); 

export default FixedButton; 