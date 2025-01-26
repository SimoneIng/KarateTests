import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Test } from '@/database/types'
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ListProps {
  data: Test[], 
  onItemLongPress: (id: number) => void;
  onItemPress: (id: number) => void; 
}

interface ItemProps {
  data: Test; 
  handleLongPress: () => void; 
  handlePress: () => void; 
}

const TestCard = ({ data, handlePress, handleLongPress }: ItemProps) => {

  const renderDate = () => {
    const date = new Date(data.test_date); 
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
  });
  }
  
  return (
    <TouchableOpacity
      style={[styles.testCard]}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Text style={[{ color: Colors.primary }, texts.subLabel]}> {renderDate()} </Text>
      <Text style={[{ color: Colors.primary }, texts.subLabel]}>{data.type}</Text>
    </TouchableOpacity>
  )
}

const TestsList = ({ data, onItemPress, onItemLongPress }: ListProps) => {
  return (
    <FlashList 
      estimatedItemSize={65}
      data={data}
      keyExtractor={item => item.test_id.toString()}
      renderItem={({item}) => 
        <TestCard 
          data={item} 
          handlePress={() => onItemPress(item.test_id)}
          handleLongPress={() => onItemLongPress(item.test_id)}
        />
      }
    /> 
  )
}

const styles = StyleSheet.create({
  testCard: {
    borderRadius: 6, 
    padding: 20, 
    marginVertical: 5,
    backgroundColor: Colors.cardBackground, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }, 
  list: {
  }, 
  row: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

export default TestsList; 