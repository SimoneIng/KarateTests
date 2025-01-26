import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Test } from '@/database/types'
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { texts } from '@/styles/texts';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  tests: Test[]; 
}

const Statistics = ({ tests }: Props) => {

  const handleClick = () => {
    router.push(`/statistics/${tests[0].athlete_id}`); 
  }

  const getSomeTestValues = () => {
    if(tests.length !== 2) return [];
    
    const test_values = [
      { value: tests[0].test_values.Esplosività['Squat Jump']['Prova 1'].cmj, frontColor: '#8884d8', label: new Date(tests[0].test_date).getMonth()+1 + "/" + new Date(tests[0].test_date).getFullYear(), spacing: 20 },
      { value: tests[1].test_values.Esplosività['Squat Jump']['Prova 1'].cmj, frontColor: '#82ca9d', label: new Date(tests[1].test_date).getMonth()+1 + "/" + new Date(tests[1].test_date).getFullYear(), spacing: 20 },

      { value: tests[0].test_values.Esplosività['Squat Jump']['Prova 1']['cmj braccia libere'], frontColor: '#8884d8', label: new Date(tests[0].test_date).getMonth()+1 + "/" + new Date(tests[0].test_date).getFullYear(), spacing: 20 },
      { value: tests[1].test_values.Esplosività['Squat Jump']['Prova 1']['cmj braccia libere'], frontColor: '#82ca9d', label: new Date(tests[1].test_date).getMonth()+1 + "/" + new Date(tests[0].test_date).getFullYear(), spacing: 20 },
    ];
    
    return test_values; 
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
        <View style={{ flex: 1, gap: 10, justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
          <Ionicons name='build-outline' size={32} color={Colors.accent} /> 
          <Text style={[texts.tinyLabel, styles.text]}>Sto lavorando ai grafici, un pò di pazienza.</Text>
        </View>
      {/* {tests.length < 2 ? (
        <View style={{ flex: 1, gap: 10, justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
          <Ionicons name='airplane' size={24} color={Colors.accent} /> 
          <Text style={[texts.subLabel, styles.text]}>Aggiungi almeno due test</Text>
        </View>
      ) : (
        <CustomBarChart title='Valori Stifness' data={getSomeTestValues()} />
      )} */}
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 5, 
    }, 
    text: {
        color: Colors.primary
    }
})

export default Statistics; 