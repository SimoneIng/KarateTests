import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';
import { useRoute } from '@react-navigation/native';
import { useDBStore } from '@/database/state';

const CustomHeader = () => {

    const { top } = useSafeAreaInsets(); 
    const route = useRoute(); 
    const { removeAthlete, removeAthleteGroup, removeTest } = useDBStore(); 

    const handleDelete = async () => {
        const { params, name } = route; 

        if (params && 'id' in params) {
            const { id } = route.params as { id: string };

            switch(name){
                case 'group/[id]': 
                    await removeAthleteGroup(parseInt(id)); 
                    router.back(); 
                break; 

                case 'athlete/[id]': 
                    await removeAthlete(parseInt(id));
                    router.back(); 
                break; 

                case 'test/[id]': 
                await removeTest(parseInt(id));
                router.back(); 
                break; 
            }
            
        }
    }

    return (
        <View style={[styles.header, { paddingTop: top, backgroundColor: Colors.background }]}>
            <TouchableOpacity 
                onPress={() => router.back()}
            >
                <Ionicons name='arrow-back-circle' size={36} color={Colors.primary} /> 
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleDelete}
            >   
                <Text style={[texts.subLabel, { color: Colors.error }]}>Cancella</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 20, 
        borderBottomWidth: 0.5, 
        borderColor: Colors.cardBackground,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
})

export default CustomHeader; 