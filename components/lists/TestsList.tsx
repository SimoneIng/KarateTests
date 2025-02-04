import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Test } from '@/database/types'
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';
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

  const handleOptionsPress = () => {

  }
  
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.testCard]}>
      
      <TouchableOpacity onPress={handleOptionsPress} style={{position: 'absolute', top: 10, right: 10}}>
        <Ionicons name='ellipsis-horizontal' size={24}/> 
      </TouchableOpacity>

      <View>
        <Text style={[texts.subLabel]}>Data Test: {renderDate()}</Text>
      </View>

      <View>
        <Text style={[texts.tinyLabel]}>Esercizi: </Text>
      </View>
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
    gap: 10, 
    borderRadius: 6, 
    padding: 10, 
    marginVertical: 5,
    backgroundColor: Colors.cardBackground, 
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    minHeight: 80, 
  }, 
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
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