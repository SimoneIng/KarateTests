import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const CustomHeader = () => {

    const { top } = useSafeAreaInsets(); 

    return (
        <View style={[styles.header, { paddingTop: top }]}>
            <TouchableOpacity 
                onPress={() => router.back()}
            >
                <Ionicons name='arrow-back-circle' size={36} color="#ccc" /> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#001d3d',
        padding: 20, 
      },
      title: {
        color: '#fff'
      }
})

export default CustomHeader; 