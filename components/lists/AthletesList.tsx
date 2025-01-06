import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Athlete } from '@/database/types'
import { texts } from '@/styles/texts';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlashList } from "@shopify/flash-list";

interface ListProps {
  data: Athlete[], 
}

interface ItemProps {
  data: Athlete; 
}

const AthleteCard = ({ data }: ItemProps) => {

  const handleAthletePress = () => {
    router.push(`/athlete/${data.athlete_id}`); 
  }
  
  return (
    <TouchableOpacity
      style={[styles.athleteCard, { backgroundColor: Colors.cardBackground }]}
      onPress={handleAthletePress}
    >
      <View style={[styles.row]}>
        <Text style={[{ color: Colors.primary }, texts.subLabel]}>{data.firstname} {data.lastname}</Text>
      </View>
    </TouchableOpacity>
  )
}

const AthletesList = ({ data }: ListProps) => {
  return (
    <FlashList
      estimatedItemSize={60}
      data={data}
      keyExtractor={item => item.athlete_id.toString()}
      renderItem={({item}) => <AthleteCard data={item} />}
    /> 
  )
}

const styles = StyleSheet.create({
  athleteCard: {
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

export default AthletesList; 