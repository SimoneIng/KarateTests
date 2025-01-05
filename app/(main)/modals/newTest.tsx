import { ScrollView, Text, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { texts } from '@/styles/texts';
import NewTestForm from '@/components/forms/NewTestForm';
import { Colors } from '@/constants/Colors';
import { TestType } from '@/database/types';
import SelectableTestType from '@/components/lists/SelectableTestType';

const newTest = () => {

  const { id, name } = useLocalSearchParams(); 
  const [testType, setTestType] = useState<TestType | null>(null); 

  useEffect(() => {
  
  }, []); 

  const handleTestTypeSelection = (testType: TestType) => {
    setTestType(testType); 
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.page, { backgroundColor: Colors.background }]}>
      
      <View style={[styles.headerSection]}>
        <Text style={[texts.pageTitle, styles.title, { color: Colors.primary }]}>Nuovo Test</Text>
        <Text style={[texts.label, styles.title, { color: Colors.secondary }]}>Atleta: {name as string}</Text>
      </View>

      {testType ? 
        <NewTestForm athlete_id={parseInt(id as string)} /> 
        : (
            <View style={[styles.contentSection]}>
              <Text style={[texts.label, styles.label]}>Seleziona Tipologia di Test</Text>
              <SelectableTestType onSelection={handleTestTypeSelection} />
            </View>
          )
      }

    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20, 
    marginBottom: 10
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