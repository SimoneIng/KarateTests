import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { useLocalSearchParams } from 'expo-router';
import { useDBStore } from '@/database/state';
import { Athlete, Test } from '@/database/types';
import { Colors } from '@/constants/Colors';

const TestScreen = () => {

  const { id, name } = useLocalSearchParams(); 

  const [test, setTest] = useState<Test>();

  useEffect(() => {

  }, []); 

  return (
    <View style={[styles.page]}>
      <Text style={[texts.pageTitle, styles.textColor]}>{name as string}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingHorizontal: 20, 
  }, 
  textColor: {
    color: Colors.primary
  },
  subTextColor: {
    color: Colors.secondary
  }, 
})

export default TestScreen; 