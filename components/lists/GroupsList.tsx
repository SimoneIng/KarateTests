import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { AthleteGroup } from '@/database/types'
import { texts } from '@/styles/texts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ListProps {
  data: AthleteGroup[], 
}

interface ItemProps {
  data: AthleteGroup; 
}

const GroupCard = ({ data }: ItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.groupCardContainer]}
      onPress={() => router.push(`/group/${data.athlete_group_id}`)}
    >
      <View style={[styles.row]}>
        <Text style={[styles.label, texts.label]}>Gruppo {data.group_name}</Text>
        <Ionicons name='clipboard' color='#fff' size={24} /> 
      </View>
    </TouchableOpacity>
  )
}

const GroupsList = ({ data }: ListProps) => {
  return (
    <FlatList 
      style={[styles.list]}
      data={data}
      keyExtractor={item => item.athlete_group_id}
      renderItem={({item}) => <GroupCard data={item} />}
    /> 
  )
}

const styles = StyleSheet.create({
  groupCardContainer: {
    borderRadius: 10, 
    backgroundColor: '#ccc', 
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
  label: {
    color: 'white'
  }
})

export default GroupsList; 