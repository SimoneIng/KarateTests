import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomButton from '../utils/CustomButton';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';
import { useDBStore } from '@/database/state';
import { Ionicons } from '@expo/vector-icons';
import SelectableGroupList from '../lists/SelectableGroupList';

const NewAthleteForm = () => {

    const { groups } = useDBStore(); 

    const handleNewAthlete = () => {

    }

    const handleGroupSelection = (id: number) => {

    }

    return (
        <View style={[styles.form]}>

            <View style={[styles.inputContainer]}>
                <Text style={[texts.label, styles.label]}>Nome</Text>
                <TextInput 
                    style={[texts.subLabel, styles.input]}
                    placeholder=''
                    placeholderTextColor={Colors.secondary}
                />          
            </View>

            <View style={[styles.inputContainer]}>
                <Text style={[texts.label, styles.label]}>Cognome</Text>
                <TextInput 
                    style={[texts.subLabel, styles.input]}
                    placeholder=''
                    placeholderTextColor={Colors.secondary}
                />          
            </View>

            <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
                <Text style={[texts.label, styles.label]}>Data di Nascita:</Text>  
                <Ionicons name='calendar' size={24} color={Colors.primary} />       
            </View>

            <View>
                <Text style={[styles.label, texts.label]}>Gruppo</Text>
                <SelectableGroupList onSelection={handleGroupSelection} /> 
            </View>


            <CustomButton title='Aggiungi' handleClick={handleNewAthlete} /> 
        </View>
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
        borderRadius: 10,
        padding: 10, 
        color: Colors.primary
    }, 
});

export default NewAthleteForm; 