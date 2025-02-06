import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { texts } from '@/styles/texts'
import GroupsList from '../lists/GroupsList'
import CustomButton from '../utils/CustomButton'
import { useDBStore, useAuthStore } from '@/database/state'
import { router } from 'expo-router'

const Groups = () => {

    const { groups } = useDBStore();
    const { role } = useAuthStore();

    useEffect(() => {

    }, [groups])

    const handleNewGroupPress = () => {
        router.push('/modals/newGroup');
    }

  return (
    <View> 

        <View style={styles.row}>
            <Text style={[texts.subTitle]}>Gruppi</Text>
            
            {role === 'coach' || role === 'admin' && 
                (
                    <CustomButton title='Aggiungi' size='small' handleClick={handleNewGroupPress} icon='add' /> 
                )
            } 
            
        </View>
    
        <GroupsList data={groups} /> 
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10, 
      },
})

export default Groups; 