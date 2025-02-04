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
        <Text style={[{ color: Colors.onCardText }, texts.label]}>Gruppo {data.group_name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[{ color: Colors.onCardText }, texts.subLabel]}>Atleti: ?</Text>
      </View>

      <TouchableOpacity
          style={styles.actionButton}
          onPress={() => alert('action')}
        >
          <Ionicons name='ellipsis-horizontal' size={24} color={Colors.onCardText} />
      </TouchableOpacity>

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
    borderRadius: 6,
    padding: 10, 
    marginVertical: 2,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }, 
  actionButton: {
    position: 'absolute', 
    top: 10,
    right: 10
  }, 
  row: {
    padding: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
})

export default GroupsList; 