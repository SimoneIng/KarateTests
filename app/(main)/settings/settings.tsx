import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '@/components/utils/CustomButton'
import { useAuthStore } from '@/database/state'
import { router } from 'expo-router'

const settings = () => {
    const { logout } = useAuthStore(); 

    const handleLogout = async () => {
        await logout(); 
        router.replace('/'); 
    }

    return (
        <View style={[styles.page]}>
            <CustomButton title='Logout' handleClick={handleLogout} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    }
})

export default settings; 