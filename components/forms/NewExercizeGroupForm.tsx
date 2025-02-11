import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { ExercizeGroup } from '@/database/types';
import { useDBStore } from '@/database/state';
import { router } from 'expo-router';
import { texts } from '@/styles/texts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomButton from '../utils/CustomButton';
import CustomInput from '../utils/CustomInput';

const NewExercizeGroupForm = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<Omit<ExercizeGroup, 'id'>>({
      defaultValues: {
        title: '',
        exercizes: []
      }
    }); 
    const { addExercizeGroup } = useDBStore()

    const onSubmit = async (data: Omit<ExercizeGroup, 'id'>) => {
        await addExercizeGroup(data.title, data.exercizes)
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
          render={({ field: { onChange, value } }) => (
              <CustomInput 
                  value={value}
                  onChange={onChange}
                  placeholder='Titolo'
              /> 
          )}
          name="title"
          />
          {errors.title && <Text style={[texts.tinyLabel, {color: Colors.error }]}>Titolo mancante o troppo corto</Text>}
      </View>

      <CustomButton title='Aggiungi' size='large' icon='add-circle' handleClick={handleSubmit(onSubmit)} />

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

export default NewExercizeGroupForm; 