import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Athlete, Test } from '@/database/types'
import { texts } from '@/styles/texts';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';

interface ListProps {
  data: Test[], 
}

interface ItemProps {
  data: Test; 
}

const TestCard = ({ data }: ItemProps) => {

  const handleTestPress = () => {
    router.push(`/test/${data.test_id}`); 
  }
  
  return (
    <TouchableOpacity
      style={[styles.testCard]}
      onPress={handleTestPress}
    >
      <View style={[styles.row]}>
        <Text style={[{ color: Colors.primary }, texts.label]}>{data.type}</Text>
        <Text style={[{ color: Colors.primary }, texts.subLabel]}> {data.test_date.toString()} </Text>
      </View>
    </TouchableOpacity>
  )
}

const TestsList = ({ data }: ListProps) => {
  return (
    <FlashList 
      estimatedItemSize={65}
      data={data}
      keyExtractor={item => item.test_id.toString()}
      renderItem={({item}) => <TestCard data={item} />}
    /> 
  )
}

const styles = StyleSheet.create({
  testCard: {
    borderRadius: 6, 
    padding: 10, 
    marginVertical: 5,
    backgroundColor: Colors.cardBackground, 
  }, 
  list: {
  }, 
  row: {
    padding: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

export default TestsList; 