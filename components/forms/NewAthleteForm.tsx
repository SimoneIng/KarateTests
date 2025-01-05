import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../utils/CustomButton';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';
import { useDBStore } from '@/database/state';
import { Ionicons } from '@expo/vector-icons';
import SelectableGroupList from '../lists/SelectableGroupList';
import { Controller, useForm } from 'react-hook-form';
import DateTimePickerModal, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

interface UserProps {
    firstname: string, 
    lastname: string, 
}

const NewAthleteForm = () => {


    const { addAthlete } = useDBStore(); 
    const { control, handleSubmit, formState: { errors } } = useForm<UserProps>();

    const [groupId, setGroupId] = useState<number | null>(null); 
    const [birthdate, setBirthdate] = useState<Date>(new Date()); 
    const [datePickerVisible, setDatePickerVisibility] = useState(false);

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || birthdate;
        
        // Su Android, il picker si chiude automaticamente dopo la selezione
        if (Platform.OS === 'android') {
          setDatePickerVisibility(false);
        }
        
        setBirthdate(currentDate);
    };

    const toggleDatePicker = (): void => {
        setDatePickerVisibility(prev => !prev);
    };
    

    const onSubmit = async (data: UserProps) => {
        if(groupId === null) {
            Alert.alert("Errore", "Gruppo non selezionato"); 
        } else if(birthdate === null){
            Alert.alert("Errore", "Data di nascita non selezionata"); 
        } else {
            await addAthlete(data.firstname, data.lastname, birthdate, groupId); 
            router.back() 
        }
    }

    const handleGroupSelection = (id: number) => {
        setGroupId(id); 
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <View style={[styles.form]}>

            <View style={[styles.inputContainer]}>
            <Controller 
            name='firstname'
            control={control}
            rules={{required: true, minLength: 4}}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                    style={[texts.subLabel, styles.input]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Nome'
                    placeholderTextColor='#ccc'
                />
            )}    
            />
            {errors.firstname && <Text style={[texts.tinyLabel, {color: Colors.error }]}>Errore</Text>}        
            </View>

            <View style={[styles.inputContainer]}>
            <Controller 
            name='lastname'
            control={control}
            rules={{required: true, minLength: 4}}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                    style={[texts.subLabel, styles.input]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Cognome'
                    placeholderTextColor='#ccc'
                />
            )}    
            />
            {errors.lastname && <Text style={[texts.tinyLabel, {color: Colors.error }]}>Errore</Text>}        
            </View>

            <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
                <Text style={[texts.label, styles.label]}>Data di Nascita:</Text>  
                
                <TouchableOpacity 
                    onPress={toggleDatePicker}
                    style={[{ flexDirection: 'row', gap: 20, alignItems: 'center' }]}
                >
                    {birthdate && (
                        <Text style={[texts.subLabel, styles.label]}>{birthdate.toLocaleDateString()}</Text>
                    )}  
                    <Ionicons name='calendar' size={24} color={Colors.primary} />  
                </TouchableOpacity>   

            </View>

            <View style={[styles.inputContainer]}>
                {datePickerVisible && (
                        <DateTimePickerModal
                        testID="dateTimePicker"
                        textColor='#fff'
                        value={birthdate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                        style={styles.datePicker}
                        />
                )}
            </View>

            <View>
                <Text style={[styles.label, texts.label]}>Gruppo</Text>
                <SelectableGroupList onSelection={handleGroupSelection} /> 
            </View>

            <CustomButton title='Aggiungi' handleClick={handleSubmit(onSubmit)} /> 
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    label: {
        color: Colors.primary
    }, 
    form: {
        gap: 20
    },
    inputContainer: {
        gap: 10, 
    },
    input: {
        borderWidth: 0.5, 
        borderColor: '#ccc', 
        borderRadius: 8,
        padding: 10, 
        color: Colors.primary
    }, 
    datePicker: {
        width: Platform.OS === 'ios' ? '100%' : undefined,
    },
});

export default NewAthleteForm; 