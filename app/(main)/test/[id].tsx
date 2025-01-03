import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { router, useLocalSearchParams } from 'expo-router';
import { useDBStore } from '@/database/state';
import { Test } from '@/database/types';
import { Colors } from '@/constants/Colors';

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


  interface Props {
    data: any, 
    parentKey?: string
  }

  const RecursiveValueViewer = ({ data, parentKey }: Props) => {
    if (data === null || data === undefined) return null;
  
    if (typeof data !== 'object') {
      return (
        <View style={styles.row}>
          <Text style={[texts.label, styles.label]}>{parentKey}</Text>
          <Text style={[texts.label, styles.value]}>{data}</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        {Object.entries(data).map(([key, value]) => {
          const fullKey = parentKey ? `${parentKey} - ${key}` : key;
  
          if (typeof value === 'object' && value !== null) {
            return (
              <View key={key} style={styles.section}>
                <Text style={[texts.label, styles.sectionTitle]}>{key}</Text>
                <View style={[styles.nestedContent]}>
                  <RecursiveValueViewer data={value} parentKey="" />
                </View>
              </View>
            );
          }
  
          return (
            <View key={key} style={styles.row}>
              <Text style={[texts.subLabel, styles.label]}>{key}</Text>
              <Text style={[texts.subLabel, styles.value]}>{value as string}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={[styles.page]}>

      <View style={[styles.pageHeader]}>
        <Text style={[texts.label, styles.textColor]}>{test?.type}</Text>
        <Text style={[texts.label, styles.textColor]}>{test?.test_date.toString()}</Text>
      </View>

      <View style={[{paddingTop: 30 }]}>
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
    marginBottom: 25, 
  }, 
  pageHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
  valuesSection: {
    paddingTop: 30, 
    gap: 10, 
  }, 
  textColor: {
    color: Colors.primary
  },
  subTextColor: {
    color: Colors.secondary
  }, 
  content: {
    marginTop: 16,
  },
  container: {
    width: '100%',
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    color: Colors.primary
  },
  nestedContent: {
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: Colors.cardBackground, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    color: Colors.primary
  },
  value: {
    color: Colors.accent
  },
})

export default TestScreen; 