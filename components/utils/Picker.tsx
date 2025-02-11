import { View, Text } from 'react-native'
import React from 'react'

interface PickerProps {
    items: [], 
    onSelection: (id: string) => void, 
}

const Picker = ({ items, onSelection }:PickerProps) => {
  return (
    <View>
      {items.map(item => (
        <View>

        </View>
      ))}
    </View>
  )
}

export default Picker;