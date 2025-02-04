import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const GroupsHeader = () => {

  const { top } = useSafeAreaInsets(); 

  return ( 
    <View style={[styles.header, 
      { 
        paddingTop: Platform.OS === 'ios' ? top : top+10, 
        padding: 20,
      }]}>
      <Text style={[{ color: Colors.primary }, texts.subTitle]}>Karate Tests</Text>
      <TouchableOpacity onPress={() => router.push('/settings/settings')}>
        <Ionicons name='settings' size={24} color={Colors.primary} />
      </TouchableOpacity> 
    </View>
  )
}

const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default GroupsHeader; 