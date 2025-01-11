import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Athlete, Test } from '@/database/types'
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';
import { useDBStore } from '@/database/state';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  tests: Test[]; 
  athlete?: Athlete; 
}

const Statistics = ({tests, athlete}: Props) => {

  const handleClick = () => {
    router.push('/statistics/statistics'); 
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Ionicons name='warning' size={24} color={Colors.primary} />
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        borderWidth: 1, 
        borderColor: Colors.primary,
        borderRadius: 8, 
        padding: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    text: {
        color: Colors.primary
    }
})

export default Statistics; 