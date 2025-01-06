import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';

const ModalHeader = () => {

    const { top } = useSafeAreaInsets(); 

    return (
        <View style={[styles.header, { 
            paddingTop: Platform.OS === 'ios' ? top : top+10, 
            padding: 20, 
            backgroundColor: Colors.background 
        }]}>
            <TouchableOpacity 
                onPress={() => router.back()}
            >
                <Ionicons name='arrow-back-circle' size={36} color={Colors.primary} /> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 20, 
        borderBottomWidth: 0.5, 
        borderColor: Colors.primary,
      },
})

export default ModalHeader; 