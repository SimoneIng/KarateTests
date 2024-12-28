import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router';

const CustomTabBar = () => {

  const handlePress = () => {
    router.push('/modals/newTest'); 
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.button]}
        onPress={handlePress}
      >
        <Ionicons name='duplicate' size={24} color='#fff' /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        bottom: 90, 
        right: 50,
        zIndex: 10
    },
    button: {
      padding: 10, 
      borderRadius: 10, 
      backgroundColor: '#06D6A0'
    }
});

export default CustomTabBar;
