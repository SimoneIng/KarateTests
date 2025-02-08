import { View, Text, StyleSheet } from 'react-native'
import CustomButton from '@/components/utils/CustomButton'
import { useAuthStore } from '@/database/state'
import { router } from 'expo-router'
import { texts } from '@/styles/texts'
import { Colors } from '@/constants/Colors'

const settings = () => {
    const { logout, role, user } = useAuthStore(); 

    const handleLogout = async () => {
        await logout(); 
        router.replace('/')
    }

    return (
        <View style={[styles.page]}>
            <View style={[styles.content]}>
                <Text style={[texts.label, {color: Colors.primary}]}>Profilo {role}</Text>
                <Text style={[texts.subLabel, {color: Colors.primary}]}>Accesso: {user?.email}</Text>
            </View>
            <CustomButton title='Logout' size='large' handleClick={handleLogout} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.background
    }, 
    content: {
        padding: 20, 
        gap: 10,
    }
})

export default settings; 