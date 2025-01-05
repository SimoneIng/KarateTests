import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import CustomButton from '../utils/CustomButton';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';
import { useForm, useController, Controller } from 'react-hook-form';
import { AthleteGroup } from '@/database/types';
import { useDBStore } from '@/database/state';
import { router } from 'expo-router';

interface Group {
    groupName: string
}; 

const NewGroupForm = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<Group>(); 
    const { addAthleteGroup } = useDBStore(); 


    const onSubmit = async (data: Group) => {
        await addAthleteGroup(data.groupName)
        router.back(); 
    }

    return (

        <View style={[styles.form]}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

        <View style={[styles.inputContainer]}>
            <Controller
            control={control}
            rules={{ required: true, minLength: 4 }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                style={[texts.subLabel, styles.input]}
                placeholder='Titolo'
                placeholderTextColor='#ccc'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                /> 
            )}
            name="groupName"
            />
            {errors.groupName && <Text style={[texts.tinyLabel, {color: Colors.error }]}>Errore</Text>}
        </View>

        <CustomButton title='Aggiungi' handleClick={handleSubmit(onSubmit)} />

        </KeyboardAvoidingView>
        </View>

        
    )
}

const styles = StyleSheet.create({
    label: {
        color: Colors.primary
    }, 
    form: {
        flex: 1, 
        gap: 30,
    },
    inputContainer: {
        gap: 10
    }, 
    input: {
        borderWidth: 0.5, 
        borderColor: '#ccc', 
        borderRadius: 8,
        padding: 10, 
        color: Colors.primary
    }, 
});

export default NewGroupForm; 