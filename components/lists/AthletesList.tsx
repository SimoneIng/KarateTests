import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Athlete } from '@/database/types'
import { texts } from '@/styles/texts';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from '@expo/vector-icons';

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

  const handleOptionPress = () => {
    alert('action')
  }
  
  return (
    <TouchableOpacity onPress={handleAthletePress} style={[styles.athleteCard, { backgroundColor: Colors.cardBackground }]} >
      <View
        style={[styles.subCard, { backgroundColor: Colors.cardBackground }]}
        >
        <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
          <Ionicons name='person-circle' size={43} color='#cc' /> 
          <Text style={[{ color: Colors.onCardText, textAlign: 'center' }, texts.label]}>{data.firstname + ' ' + data.lastname}</Text>
        </View>
        {/* <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
          <Text style={[{ color: Colors.onCardText, textAlign: 'center' }, texts.subLabel]}>N. Test: </Text>
          <Text style={[{ color: Colors.onCardText, textAlign: 'center' }, texts.subLabel]}></Text>
        </View> */}
      </View>
      <View style={{
        position: 'absolute', 
        right: 10,
        top: 10, 
      }}>
        <TouchableOpacity 
          onPress={handleOptionPress}
        >
          <Ionicons name='ellipsis-horizontal' size={21} /> 
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const AthletesList = ({ data }: ListProps) => {
  return (
    <FlashList
      estimatedItemSize={60}
      alwaysBounceVertical={true}
      data={data}
      numColumns={1}
      keyExtractor={item => item.athlete_id.toString()}
      renderItem={({item}) => <AthleteCard data={item} />}
    /> 
  )
}

const styles = StyleSheet.create({
  athleteCard: {
    borderRadius: 6, 
    paddingHorizontal: 10,
    paddingVertical: 15,  
    marginVertical: 10,
    marginHorizontal: 5, 
    flex: 1, 
    minHeight: 60, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }, 
  subCard: {
    gap: 10, 
    flexDirection: 'column', 
    alignItems: 'center'
  }, 
  list: {
  }, 
}) 

export default AthletesList; 