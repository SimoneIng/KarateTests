import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect } from 'react'
import CustomInput from '../utils/CustomInput';
import { texts } from '@/styles/texts';
import { useForm, Controller } from 'react-hook-form';
import { ExercizeWithReps } from '@/database/types';
import CustomButton from '../utils/CustomButton';
import { useDBStore } from '@/database/state';
import Switch from '../utils/Switch';
import { Ionicons } from '@expo/vector-icons';
import StepInput from '../utils/StepInput';
import SelectableMetricType from '../lists/SelectableMetricType';

interface FormProps {
  exercizeGroupId: number, 
  onConfirm: () => void, 
}

const NewExercizeForm = ({ exercizeGroupId, onConfirm }: FormProps) => {

  const { control, handleSubmit, formState: { errors } } = 
   useForm<Omit<ExercizeWithReps, 'id'>>({
      defaultValues: {
        comparison: true, 
      }
  });

  const { addExercizeToExercizeGroup,  metric_types } = useDBStore(); 
 
  const onSubmit = async (data: Omit<ExercizeWithReps, 'id'>) => {
    try {
      await addExercizeToExercizeGroup(exercizeGroupId, data)
      onConfirm()
    } catch(error) {
      console.log(error)
      console.log(errors)
    }
  }

  return (
    <View style={[]} >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={[texts.title, { marginBottom: 20 }]}>Nuovo Esercizio</Text>

      <View style={{gap: 15, marginBottom: 20}}>
        <View style={{gap: 5}}>
          <Text style={[texts.label]}>Nome</Text>

          <Controller 
            name='name'
            control={control}
            rules={{required: true, minLength: 3}}
            render={({ field: { onChange, value } }) => (
                <CustomInput
                    value={value}
                    placeholder=''
                    onChange={onChange}
                /> 
            )}    
            />
        </View>

        <View style={{flexDirection: 'row', gap: 30, alignItems: 'center'}}>
          <Text style={[texts.subLabel]}>Metrica</Text>

          <Controller
            name='metric'
            control={control}
            rules={{required: true}}
            render={({field: { onChange, value }}) => (
              <SelectableMetricType elements={metric_types} onSelectMetric={onChange} selectedItem={value}  /> 
            )}
          />

        </View>

        <View style={{flexDirection: 'row', gap: 30, alignItems: 'center'}}>
          <Text style={[texts.subLabel]}>Dx/Sx?</Text>

          <Controller
            name='type'
            defaultValue='single'
            control={control}
            rules={{required: true}}
            render={({field: { onChange, value }}) => (
              <Switch labelX='No' labelY='Si' onChange={onChange} optionX='single' optionY='double' value={value} /> 
            )}
          />

        </View>
        
        <View style={[{flexDirection: 'row', alignItems: 'center', gap: 30}]}>
          <Text style={[texts.subLabel]}>Ripetizioni</Text>

          <Controller
            name='reps'
            control={control}
            rules={{required: true}}
            render={({field: { onChange, value }}) => (
              <StepInput min={1} value={value} onChange={onChange} /> 
            )}
          />

        </View>

        <View style={[{flexDirection: 'row', gap: 30, alignItems: 'center'}]}>
         
          <View style={{}}>
            <View style={[{flexDirection: 'row', gap: 5, alignItems: 'center'}]}>
              <Text style={[texts.subLabel]}>Comparazione</Text>
              <TouchableOpacity
                onPress={() => alert('Disattiva se un valore minore vuol dire un buon risultato.')}
              >
                <Ionicons name='help-circle' size={18} /> 
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[]}>
            <Controller
              name='comparison'
              control={control}
              render={({field: { onChange, value }}) => (
                <Switch labelX='F' labelY='V' 
                  onChange={(val) => {
                    onChange(val);
                  }}
                  optionX={false} optionY={true} value={value} 
                /> 
              )}
            />
          </View>

        </View>

      </View>
      
      <CustomButton title='Crea' icon='add-circle' size='medium' handleClick={handleSubmit(onSubmit, (errors) => console.log(errors))} />
    
    </KeyboardAvoidingView>
    </View>
  )

}

export default NewExercizeForm; 