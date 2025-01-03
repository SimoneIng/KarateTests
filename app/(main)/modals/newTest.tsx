import { ScrollView, Text, View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { texts } from '@/styles/texts';
import NewTestForm from '@/components/forms/NewTestForm';
import { Colors } from '@/constants/Colors';
import { Test } from '@/database/types';
import { useDBStore } from '@/database/state';
import SelectableTestType from '@/components/lists/SelectableTestType';

const newTest = () => {

  const { test_types } = useDBStore();  
  const { id, name } = useLocalSearchParams(); 
  const [test, setTest] = useState<Test | null>(null); 

  useEffect(() => {
  
  }, []); 

  const handleTestTypeSelection = () => {

  }

  return (
    <ScrollView style={[styles.page, { backgroundColor: Colors.background }]}>
      
      <View style={[styles.headerSection]}>
        <Text style={[texts.pageTitle, styles.title, { color: Colors.primary }]}>Nuovo Test</Text>
        <Text style={[texts.label, styles.title, { color: Colors.secondary }]}>Atleta {name as string}</Text>
      </View>

      <View style={[styles.contentSection]}>
        <Text style={[texts.label, styles.label]}>Seleziona Tipologia di Test</Text>
        <SelectableTestType onSelection={handleTestTypeSelection} />
      </View>
      
      <NewTestForm /> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20, 
  },
  title: {
    textAlign: 'center', 
  },
  label: {
    color: Colors.primary, 
  },
  headerSection: {
    gap: 5, 
    marginVertical: 10, 
  }, 
  contentSection: {
    gap: 10, 
    marginVertical: 10
  }
})

export default newTest; 