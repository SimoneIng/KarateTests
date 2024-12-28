import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const GroupsHeader = () => {

  const { top } = useSafeAreaInsets(); 
  return ( 
    <View style={[styles.header, { paddingTop: top, paddingHorizontal: 20 }]}>
      <Text style={[styles.title, texts.title]}>Gruppi</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#001d3d'
  },
  title: {
    color: '#fff'
  }
})

export default GroupsHeader; 