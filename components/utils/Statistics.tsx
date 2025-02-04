import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Test } from '@/database/types'
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { texts } from '@/styles/texts';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  tests: Test[]; 
}

const Statistics = ({ tests }: Props) => {

  const handleClick = () => {
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
        <View style={{ flex: 1, gap: 10, justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
          <Ionicons name='build-outline' size={32} color={Colors.accent} /> 
          <Text style={[texts.tinyLabel, styles.text]}>Sto lavorando ai grafici, un pò di pazienza.</Text>
        </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 5, 
    }, 
    text: {
        color: Colors.primary
    }
})

export default Statistics; 