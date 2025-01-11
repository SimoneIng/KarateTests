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
        <Text style={[{ color: Colors.primary, textAlign: 'center' }, texts.subLabel]}>{data.firstname}</Text>
        <Text style={[{ color: Colors.primary, textAlign: 'center' }, texts.subLabel]}>{data.lastname}</Text>
    </TouchableOpacity>
  )
}

const AthletesList = ({ data }: ListProps) => {
  return (
    <FlashList
      estimatedItemSize={60}
      alwaysBounceVertical={true}
      data={data}
      numColumns={2}
      keyExtractor={item => item.athlete_id.toString()}
      renderItem={({item}) => <AthleteCard data={item} />}
    /> 
  )
}

const styles = StyleSheet.create({
  athleteCard: {
    borderRadius: 6, 
    padding: 10, 
    margin: 5,
    flex: 1, 
    minHeight: 60, 
  }, 
  list: {
  }, 
}) 

export default AthletesList; 