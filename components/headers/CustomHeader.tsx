import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useRoute } from '@react-navigation/native';
import { useAuthStore, useDBStore } from '@/database/state';
import { texts } from '@/styles/texts';
import CustomButton from '../utils/CustomButton';

const CustomHeader = () => {

    const { top } = useSafeAreaInsets(); 
    const route = useRoute(); 
    const { removeAthlete, removeAthleteGroup, removeTest } = useDBStore(); 

    const { role } = useAuthStore(); 

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
        <View 
            style={[styles.header, { 
                paddingTop: Platform.OS === 'ios' ? top : top+10, 
                padding: 20, 
            }]}
        >
            <TouchableOpacity 
                onPress={() => router.back()}
            >
                <Ionicons name='arrow-back-circle' size={36} color={Colors.primary} /> 
            </TouchableOpacity>

            {role === 'coach' || role === 'admin' && (
                <CustomButton title='Elimina' size='small' handleClick={handleDelete} /> 
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {  
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.cardBackground
      },
})

export default CustomHeader; 