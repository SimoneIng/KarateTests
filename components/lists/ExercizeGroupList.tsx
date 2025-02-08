import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { texts } from '@/styles/texts';
import { ExercizeGroup } from '@/database/types';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ListProps {
  exercizeGroups: ExercizeGroup[],
  onClick: (id: number) => void, 
}

interface ItemProps {
  exercizeGroup: ExercizeGroup, 
  onClick: (id: number) => void, 
}


const Item = ({ exercizeGroup, onClick }: ItemProps) => {

  return (
    <TouchableOpacity style={[styles.item]}
      onPress={() => onClick(exercizeGroup.id)}
    >
      
      <View style={[styles.titleSection]}>
        <Text style={[texts.label]}>{exercizeGroup.title}</Text>
        <Ionicons name='open-outline' size={21} /> 
      </View>
      
      {exercizeGroup.exercizes.length === 0 && (
        <View style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15
        }}>  
            <Text>Ancora nessun esercizio aggiunto.</Text>
        </View>
      )}

      <View>
        {exercizeGroup.exercizes !== undefined && exercizeGroup.exercizes.map(exercize => (
          <View key={exercize.id}>
            <View style={[styles.row]}>

              <View style={[styles.row]}>
                <Ionicons name='ellipse' size={12} /> 
                <Text style={[texts.subLabel]}>{exercize.name}</Text>
              </View>

              <Text style={[texts.subLabel]}>{exercize.reps}°Reps</Text>
            </View>

          </View>
        ))}
      </View>

    </TouchableOpacity>
  )
}

const EmptyList = () => {
  return (
    <View style={{
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={[texts.subLabel]}>Nessun Gruppo di Esercizi...</Text>
    </View>
  )
}

const ExercizeGroupList = ({ exercizeGroups, onClick }: ListProps) => {
  return (
    <FlashList 
      ListEmptyComponent={EmptyList}
      data={exercizeGroups}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <Item exercizeGroup={item} onClick={onClick} />}
      estimatedItemSize={150}
    /> 
  )
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 6, 
    padding: 10, 
    marginVertical: 5, 
    backgroundColor: Colors.cardBackground,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row', 
    margin: 3, 
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between'
  },
  titleSection: {
    borderBottomWidth: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5
  }, 
})

export default ExercizeGroupList; 