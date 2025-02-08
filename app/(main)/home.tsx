import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { texts } from '@/styles/texts'
import Groups from '@/components/UIElements/Groups'
import Exercizes from '@/components/UIElements/Exercizes'

const HomeScreen = () => {

  const [selectedTab, setSelectedTab] = useState(0); 

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.page, { backgroundColor: Colors.background }]}>
      
      <View style={[styles.tabs]}>
        <TouchableOpacity 
          onPress={() => setSelectedTab(0)}
          style={[styles.tabsButton, selectedTab === 0 && styles.selectedTab]}
        >
          <Text style={[texts.label]}>Gruppi</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => setSelectedTab(1)}
           style={[styles.tabsButton, selectedTab === 1 && styles.selectedTab]}
        >
          <Text style={[texts.label]}>Esercizi</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 0 
        ? (
          <Groups /> 
        ) 
        : (
          <Exercizes /> 
        )}
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 30
  }, 
  tabs: {
    flexDirection: 'row',
    padding: 5, 
    gap: 10, 
    marginBottom: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center'
  },
  tabsButton: {
    padding: 5
  },
  selectedTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'black', 
  }

})

export default HomeScreen; 

