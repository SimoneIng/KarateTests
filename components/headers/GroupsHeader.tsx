import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'

const GroupsHeader = () => {

  const { top } = useSafeAreaInsets(); 
  return ( 
    <View style={[styles.header, { paddingTop: top, padding: 20 }]}>
      <Text style={[{ color: Colors.primary }, texts.title]}>Gruppi</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { 
    borderBottomWidth: 0.5, 
    borderColor: Colors.cardBackground, 
    backgroundColor: Colors.background, 
  }
})

export default GroupsHeader; 