import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useRoute } from '@react-navigation/native';
import { useAuthStore, useDBStore } from '@/database/state';

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
                backgroundColor: Colors.background
            }]}
        >
            <TouchableOpacity 
                onPress={() => router.back()}
            >
                <Ionicons name='arrow-back-circle' size={36} color={Colors.primary} /> 
            </TouchableOpacity>

            {role === 'coach' || role === 'admin' && (
                <TouchableOpacity
                    style={styles.button}
                    onLongPress={handleDelete}
                >   
                    <Ionicons name='trash-bin-outline' size={21} color={Colors.primary} />
                </TouchableOpacity>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: { 
        borderBottomWidth: 0.5, 
        borderColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background
      },
      button: {
      }
})

export default CustomHeader; 