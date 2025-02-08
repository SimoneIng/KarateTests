import { View, Text } from 'react-native'
import React from 'react'
import CustomInput from '../utils/CustomInput';
import { texts } from '@/styles/texts';
import { useForm, Controller } from 'react-hook-form';
import { ExercizeWithReps } from '@/database/types';
import CustomButton from '../utils/CustomButton';

interface FormProps {
  onConfirm: () => void, 
}

const NewExercizeForm = ({ onConfirm }: FormProps) => {

  const { control, handleSubmit, formState: { errors } } = useForm<Omit<ExercizeWithReps, 'id'>>();

  const onSubmit = () => {

  }

  return (
    <View style={[]} >
      <Text style={[texts.title, { marginBottom: 20 }]}>Nuovo Esercizio</Text>

      <View style={{gap: 10, marginBottom: 20}}>
        <View style={{gap: 5}}>
          <Text style={[texts.label]}>Nome</Text>

          <Controller 
            name='name'
            control={control}
            rules={{required: true, minLength: 4}}
            render={({ field: { onChange, value } }) => (
                <CustomInput
                    value={value}
                    placeholder=''
                    onChange={onChange}
                /> 
            )}    
            />
        </View>

        <View>
          <Text style={[texts.subLabel]}>Metrica</Text>


        </View>

        <View>
          <Text style={[texts.subLabel]}>Dx/Sx?</Text>


        </View>
        
        <View>
          <Text style={[texts.subLabel]}>Ripetizioni</Text>


        </View>

        <View>
          <Text style={[texts.subLabel]}>Comparazione</Text>
          <Text style={[texts.tinyLabel]}>Un valore maggiore è positivo?</Text>


        </View>

      </View>
      
      <CustomButton title='Crea' icon='add-circle' size='medium' handleClick={handleSubmit(onSubmit)} />
    </View>
  )

}

export default NewExercizeForm; 