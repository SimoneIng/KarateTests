import { View, StyleSheet, Text, TextInput } from 'react-native'
import React from 'react'
import CustomButton from '../utils/CustomButton';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';

const NewGroupForm = () => {

    const handleNewGroup = () => {

    }

    return (
        <View style={[styles.form]}>

            <View style={[styles.inputContainer]}>
                <Text style={[texts.label, styles.label]}>Titolo</Text>
                <TextInput 
                    style={[texts.subLabel, styles.input]}
                    placeholder=''
                    placeholderTextColor={Colors.secondary}
                />          
            </View>


            <CustomButton title='Aggiungi' handleClick={handleNewGroup} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        color: Colors.primary
    }, 
    form: {
        flex: 1, 
        gap: 30
    },
    inputContainer: {
        gap: 10
    }, 
    input: {
        borderWidth: 0.5, 
        borderColor: '#ccc', 
        borderRadius: 10,
        padding: 10, 
        color: Colors.primary
    }, 
});

export default NewGroupForm; 