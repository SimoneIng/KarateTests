import { View, Text } from 'react-native'
import React from 'react'
import { ExercizeWithReps } from '@/database/types'
import { FlashList } from '@shopify/flash-list'

interface ItemProps {
  exercize: ExercizeWithReps, 
  onClick?: (id: number) => void, 
}

interface ListProps {
  exercizeList: ExercizeWithReps[],
  onClick?: (id: number) => void, 
}

const Item = ({ exercize, onClick }: ItemProps) => {
  return (
    <View>
      <Text>{exercize.name}</Text>
    </View>
  )
}

const ExercizeList = ({ exercizeList, onClick }: ListProps) => {
  return (
    <FlashList
      keyExtractor={(item) => item.id.toString()}
      data={exercizeList}
      renderItem={({item}) => <Item exercize={item} />} 
    /> 
  )
}

export default ExercizeList; 