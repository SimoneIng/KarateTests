import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { texts } from '@/styles/texts'
import { useLocalSearchParams } from 'expo-router';

const GroupScreen = () => {

  const { id } = useLocalSearchParams(); 

  const fetchGroup = async () => {

  }

  useEffect(() => {
    
    fetchGroup(); 
  }, []); 

  return (
    <View style={[styles.page]}>
      <Text style={[texts.pageTitle, styles.textColor]}>Gruppo </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    backgroundColor: '#001d3d', 
    paddingHorizontal: 20, 
  }, 
  textColor: {
    color: 'white'
  }
})

export default GroupScreen; 