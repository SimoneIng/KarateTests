import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '@/styles/texts'
import { Colors } from '@/constants/Colors'
import { useDBStore } from '@/database/state'
import { Test } from '@/database/types'
import { router, useLocalSearchParams } from 'expo-router'
import RecursiveValueViewer from '@/components/utils/RecursiveValueViewer'
import RecursiveValueCompare from '@/components/utils/RecursiveValueCompare'

const statistics = () => {

  const { getTestsByAthleteId } = useDBStore(); 
  const { id } = useLocalSearchParams(); 

  const [previousTest, setPreviousTest] = useState<Test | null>(null); 
  const [latestTest, setLatestTest] = useState<Test | null>(null); 

  useEffect(() => {
    const testToCompare = getTestsByAthleteId(parseInt(id as string)).sort((a, b) => new Date(a.test_date).getMilliseconds() - new Date(b.test_date).getMilliseconds()).slice(0, 2)

    // aggiustare quando introdurrai altri tipi di test. 
    if(testToCompare.length < 2) router.back(); 

    setLatestTest(testToCompare[1]) 
    setPreviousTest(testToCompare[0])
  }, []); 

  return (
    <ScrollView style={[styles.page]}>
      <Text style={[texts.pageTitle, styles.text]}>Statistiche</Text>
      <View>
        <Text style={[texts.label, styles.text]}>Ultimi due Test Effettuati</Text>
        <Text style={[texts.subLabel, styles.text]}>{previousTest?.test_date} - {latestTest?.test_date}</Text>
      </View>
      <View>
        <RecursiveValueCompare test1={previousTest?.test_values} test2={latestTest?.test_values} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1, 
    marginHorizontal: 15,
    marginTop: 20
  },
  text: {
    color: Colors.primary
  }
})

export default statistics;