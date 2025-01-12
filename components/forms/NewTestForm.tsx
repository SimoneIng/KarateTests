import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Colors } from '@/constants/Colors';
import CustomButton from '../utils/CustomButton';
import { texts } from '@/styles/texts';
import { StandardTestValues } from '@/database/types';
import { useDBStore } from '@/database/state';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface Props {
  athlete_id: number, 
}

const TestForm = ({ athlete_id }: Props) => {
  
  const { control, handleSubmit, formState: { errors } } = useForm<StandardTestValues>();
  const [date, setDate] = useState<Date>(new Date());
  const [datePickerVisible, setDatePickerVisibility] = useState(false);
  const { addTest } = useDBStore(); 

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      
      // Su Android, il picker si chiude automaticamente dopo la selezione
      if (Platform.OS === 'android') {
        setDatePickerVisibility(false);
      }
      
      setDate(currentDate);
  };
  
  const toggleDatePicker = (): void => {
      setDatePickerVisibility(prev => !prev);
  };
  

  const onSubmit = async (data: StandardTestValues) => {
    await addTest(athlete_id, "Test Standard", data, date); 
    router.back(); 
  };

  const renderInput = (name: string, label: string, control: any) => (
    <View style={styles.inputContainer}>
      <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        <Ionicons name='ellipse' size={14} color={Colors.primary} />
        <Text style={[texts.subLabel , styles.label]}>- {label}</Text>
      </View>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, value  } }) => (
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChange(text)}
            value={value?.toString()}
            keyboardType='numeric'
          />
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={[styles.section]}>
        <Text style={[texts.label, styles.sectionTitle]}>Data</Text>
        <TouchableOpacity 
            onPress={toggleDatePicker}
            style={[{ flexDirection: 'row', gap: 20, alignItems: 'center' }]}
        >
            {date && (
                <Text style={[texts.subLabel, styles.label, { marginLeft: 10 }]}>{date.toLocaleDateString()}</Text>
            )}  
            <Ionicons name='calendar' size={24} color={Colors.primary} />  
        </TouchableOpacity> 
        
        {datePickerVisible && (
            <DateTimePickerModal
            testID="dateTimePicker"
            textColor='#fff'
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            style={styles.datePicker}
            />
          )}
      </View>
      
      <View style={styles.section}>
      <Text style={[texts.label, styles.sectionTitle]}>Generali</Text>
        {renderInput('Altezza', 'Altezza', control)}
        {renderInput('Peso', 'Peso', control)}
      </View>

      <View style={styles.section}>
        <Text style={[texts.label, styles.sectionTitle]}>Flessibilità</Text>
        {renderInput('Flessibilità.In piedi', 'In piedi', control)}
        {renderInput('Flessibilità.Seduto', 'Seduto', control)}
      </View>

      {/* Rapidità */}
      <View style={styles.section}>
        <Text style={[texts.label, styles.sectionTitle]}>Rapidità</Text>
        {renderInput('Rapidità.N mov skip 30sec', 'N. mov skip 30sec', control)}
        {renderInput('Rapidità.Sec 30 mov skip', 'Sec. 30 mov skip', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>N. mov giaku 30sec</Text>
        {renderInput('Rapidità.N mov giaku 30sec.DX', 'DX', control)}
        {renderInput('Rapidità.N mov giaku 30sec.SX', 'SX', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>Sec. 30 mov giaku</Text>
        {renderInput('Rapidità.Sec 30 mov giaku.DX', 'DX', control)}
        {renderInput('Rapidità.Sec 30 mov giaku.SX', 'SX', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>N. mov mawashi 30sec</Text>
        {renderInput('Rapidità.N mov mawashi 30sec.DX', 'DX', control)}
        {renderInput('Rapidità.N mov mawashi 30sec.SX', 'SX', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>Sec. 30 mov mawashi</Text>
        {renderInput('Rapidità.Sec 30 mov mawashi.DX', 'DX', control)}
        {renderInput('Rapidità.Sec 30 mov mawashi.SX', 'SX', control)}
      </View>

      {/* Esplosività */}
      <View style={styles.section}>
        <Text style={[texts.label, styles.sectionTitle]}>Esplosività</Text>
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>Stiffness - Prova 1</Text>
        {renderInput('Esplosività.Stiffness.Prova 1.Minimo', 'Minimo', control)}
        {renderInput('Esplosività.Stiffness.Prova 1.Massimo', 'Massimo', control)}
        {renderInput('Esplosività.Stiffness.Prova 1.Tempo contatto', 'Tempo contatto', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>Stiffness - Prova 2</Text>
        {renderInput('Esplosività.Stiffness.Prova 2.Minimo', 'Minimo', control)}
        {renderInput('Esplosività.Stiffness.Prova 2.Massimo', 'Massimo', control)}
        {renderInput('Esplosività.Stiffness.Prova 2.Tempo contatto', 'Tempo contatto', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>Squat Jump - Prova 1</Text>
        {renderInput('Esplosività.Squat Jump.Prova 1.cmj', 'CMJ', control)}
        {renderInput('Esplosività.Squat Jump.Prova 1.cmj braccia libere', 'CMJ braccia libere', control)}
        
        <Text style={[texts.label, styles.subSectionTitle, {marginLeft: 5 }]}>Squat Jump - Prova 2</Text>
        {renderInput('Esplosività.Squat Jump.Prova 2.cmj', 'CMJ', control)}
        {renderInput('Esplosività.Squat Jump.Prova 2.cmj braccia libere', 'CMJ braccia libere', control)}
      </View>

      {/* Navetta */}
      <View style={styles.section}>
        <Text style={[texts.label, styles.sectionTitle]}>Navetta</Text>
        {renderInput('Navetta 8mt x 10', 'Navetta 8mt x 10', control)}
      </View>

      <CustomButton title="Aggiungi" handleClick={handleSubmit(onSubmit, () => Alert.alert("Errore", "Campi Mancanti"))} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.accent, 
    marginBottom: 10,
  },
  subSectionTitle: {
    color: Colors.primary, 
    marginBottom: 10
  }, 
  inputContainer: {
    marginBottom: 12,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: Colors.secondary, 
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    color: Colors.primary,
    minWidth: 70,
    textAlign: 'right'
  },
  datePicker: {
      width: Platform.OS === 'ios' ? '100%' : undefined,
  },
});

export default TestForm;