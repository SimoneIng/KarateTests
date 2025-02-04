import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroupsList from '@/components/lists/GroupsList'
import { useAuthStore, useDBStore } from '@/database/state'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { texts } from '@/styles/texts'
import CustomButton from '@/components/utils/CustomButton'
import ExercizesList from '@/components/lists/ExercizesList'

const HomeScreen = () => {

  const { groups } = useDBStore();
  const { role } = useAuthStore();

  const [selectedTab, setSelectedTab] = useState(0); 

  useEffect(() => {
  
  }, [groups]); 

  const handleNewGroupPress = () => {
    router.push('/modals/newGroup');
  }

  return (
    <ScrollView style={[styles.page, { backgroundColor: Colors.background }]}>
      
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

      <View style={styles.row}>
        <Text style={[texts.subTitle]}>Gruppi</Text>
        
        {role === 'coach' || role === 'admin' && 
          (
            <CustomButton title='Aggiungi' size='small' handleClick={handleNewGroupPress} icon='add' /> 
          )
        } 
      </View>
      
      
      <GroupsList data={groups} /> 

      {/* <View style={[styles.row]}>
        <Text style={[texts.label]}>Test ed Esercizi</Text>
      </View>

      <ExercizesList /> */}
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    paddingHorizontal: 20,
    paddingTop: 30
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10, 
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

