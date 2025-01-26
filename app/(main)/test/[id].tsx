import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { router, useLocalSearchParams } from 'expo-router';
import { useDBStore } from '@/database/state';
import { Test } from '@/database/types';
import { Colors } from '@/constants/Colors';
import RecursiveValueViewer from '@/components/utils/RecursiveValueViewer';

const TestScreen = () => {

  const { id } = useLocalSearchParams(); 
  const { tests } = useDBStore(); 

  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    const t = tests.find(test => test.test_id === parseInt(id as string)); 
    if(t === undefined){
      router.back(); 
    } else {
      setTest(t); 
    }
  }, []); 

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.page]}>

      <View style={[styles.pageHeader]}>
        <Text style={[texts.label, styles.textColor]}>{test?.type}</Text>
        <Text style={[texts.label, styles.textColor]}>{test?.test_date.toLocaleString()}</Text>
      </View>

      <View style={[{paddingTop: 20, paddingBottom: 40 }]}>
        <RecursiveValueViewer data={test && test.test_values} />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingHorizontal: 20, 
    paddingTop: 30,
  }, 
  pageHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
  textColor: {
    color: Colors.primary, 
  }
})

export default TestScreen; 