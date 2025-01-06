import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AthleteGroup } from '@/database/types'
import { texts } from '@/styles/texts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlashList } from '@shopify/flash-list';

interface ListProps {
  data: AthleteGroup[], 
}

interface ItemProps {
  data: AthleteGroup; 
}

const GroupCard = ({ data }: ItemProps) => {

  const handleGroupPress = () => {
    router.push(`/group/${data.group_id}`)
  }
  
  return (
    <TouchableOpacity
      style={[styles.groupCard, { backgroundColor: Colors.cardBackground }]}
      onPress={handleGroupPress}
    >
      <View style={[styles.row]}>
        <Text style={[{ color: Colors.primary }, texts.label]}>Gruppo {data.group_name}</Text>
        <Ionicons name='clipboard' color={Colors.primary} size={24} /> 
      </View>
    </TouchableOpacity>
  )
}

const GroupsList = ({ data }: ListProps) => {
  return (
    <FlashList 
      estimatedItemSize={65}
      data={data}
      keyExtractor={item => item.group_id.toString()}
      renderItem={({item}) => <GroupCard data={item} />}
    /> 
  )
}

const styles = StyleSheet.create({
  groupCard: {
    borderRadius: 10,
    padding: 10, 
    marginVertical: 5,
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

export default GroupsList; 