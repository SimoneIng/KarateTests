import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ExercizeWithReps } from '@/database/types'
import { FlashList } from '@shopify/flash-list'
import { texts } from '@/styles/texts'
import { Ionicons } from '@expo/vector-icons'

interface ItemProps {
  exercize: ExercizeWithReps, 
  onClick: (id: number) => void, 
}

interface ListProps {
  exercizeList: ExercizeWithReps[],
  onClick: (id: number) => void, 
}

const Item = ({ exercize, onClick }: ItemProps) => {
  return (
    <TouchableOpacity style={[styles.row]}
      onPress={() => onClick(exercize.id)}
    >
      <View style={{flex: 2}}>
        <Text style={[texts.subLabel]}>{exercize.name}</Text>
      </View>
      <Text style={[texts.subLabel, { flex: 1, textAlign: 'center' }]}>{exercize.metric}</Text>
      <Text style={[texts.subLabel, { flex: 1, textAlign: 'center' }]}>
        {exercize.type === 'double' ? <Ionicons name='ellipse' size={8} />  : ''}
      </Text>
      <Text style={[texts.subLabel, { flex: 1, textAlign: 'center' }]}>{exercize.reps}</Text>
      <Text></Text>
  </TouchableOpacity>
  )
}

const EmptyList = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
      <Text>Nessun Esercizio.</Text>
    </View>
  )
}

const ExercizeList = ({ exercizeList, onClick }: ListProps) => {
  return (
    <View>
      <View style={[styles.row]}>
        <View style={{flex: 2}}>
          <Text style={[texts.label]}>Esercizio</Text>
        </View>
        <Text style={[texts.subLabel, { flex: 1, textAlign: 'center' }]}></Text>
        <Text style={[texts.subLabel, { flex: 1, textAlign: 'center' }]}>Dx/Sx</Text>
        <Text style={[texts.subLabel, { flex: 1, textAlign: 'center' }]}>Reps</Text>
      </View>
      <FlashList
        keyExtractor={(item) => item.id.toString()}
        data={exercizeList}
        renderItem={({item}) => <Item exercize={item} onClick={onClick} />}
        estimatedItemSize={50}
        ListEmptyComponent={EmptyList}
        /> 
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottomWidth: 0.8, 
    paddingVertical: 5, 
    paddingHorizontal: 5
  }
})

export default ExercizeList; 