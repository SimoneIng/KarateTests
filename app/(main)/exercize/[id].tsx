import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthStore, useDBStore } from '@/database/state';
import { ExercizeGroup, ExercizeWithReps } from '@/database/types';
import { texts } from '@/styles/texts';
import ExercizeList from '@/components/lists/ExercizeList';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/utils/CustomButton';
import CustomBottomSheet from '@/components/utils/BottomSheet';
import NewExercizeForm from '@/components/forms/NewExercizeForm';
import ExercizeView from '@/components/UIElements/ExercizeView';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const ExercizeGroupScreen = () => {

  const { id } = useLocalSearchParams(); 
  const { role } = useAuthStore(); 
  const { exercizeGroups } = useDBStore(); 
  const [exercizeGroup, setExercizeGroup] = useState<ExercizeGroup>()
  
  const [clickedExercize, setClickedExercize] = useState<ExercizeWithReps | null>(null); 
  const [creatingNewExercize, setCreateNewExercize] = useState<boolean>(false)
  
  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState(false); 


  useEffect(() => {
    const exercizeGroupId = parseInt(id as string);
    const exercizeGroup = exercizeGroups.find(exercizeGroup => exercizeGroup.id === exercizeGroupId);

    if(exercizeGroup !== undefined){
      setExercizeGroup(exercizeGroup)
    } else {
      router.back(); 
    }

  }, [exercizeGroup])

  const handleExercizeClick = (id: number) => {

    if(bottomSheetIsVisible) return; 

    const clickedEx = exercizeGroup ? exercizeGroup.exercizes.find(exercize => exercize.id === id) :  null; 

    if(clickedEx){
      setClickedExercize(clickedEx)
      setBottomSheetIsVisible(true)
    } 

  }

  const handleDismiss = () => {
    if(creatingNewExercize) setCreateNewExercize(false)
    if(clickedExercize) setClickedExercize(null)
    setBottomSheetIsVisible(false)
  }

  const handleAddExercize = () => {
    setCreateNewExercize(true)
    setBottomSheetIsVisible(true)
  }

  const handleFormSubmit = () => {
    setCreateNewExercize(false)
    setBottomSheetIsVisible(false)
  }
  
  return (
    <>
      <ScrollView style={styles.page}>
        <Text style={[texts.pageTitle]}>{exercizeGroup?.title}</Text>
        
        <View style={styles.subpage}>
          <Text style={[texts.label]}>Numero di Esercizi: {exercizeGroup?.exercizes.length}</Text>

          <View style={[{flexDirection: 'row', gap: 5, alignItems: 'center'}]}>
            <Ionicons name='help-circle' size={18} />
            <Text style={[texts.tinyLabel]}>Clicca su un esercizio per modificarlo</Text>
          </View>
          
          <ExercizeList onClick={handleExercizeClick} exercizeList={exercizeGroup ? exercizeGroup.exercizes : []} /> 

          {role === 'coach' || role === 'admin' && (
            <View>
                <CustomButton title='Aggiungi Esercizio' size='large' handleClick={handleAddExercize} /> 
            </View>
          )}

        </View>

      </ScrollView>

      <BottomSheetModalProvider>
      <CustomBottomSheet
        isVisible={bottomSheetIsVisible}
        onDismiss={handleDismiss}    
        > 
          {(clickedExercize && exercizeGroup !== undefined) && (
            <ExercizeView exercize={clickedExercize} exercizeGroupId={exercizeGroup.id} onAction={handleDismiss} /> 
          )}
          {(creatingNewExercize && exercizeGroup !== undefined) && (
            <NewExercizeForm exercizeGroupId={exercizeGroup.id} onConfirm={handleFormSubmit} /> 
          )}
      </CustomBottomSheet>
      </BottomSheetModalProvider>
    </>

  )
}

const styles = StyleSheet.create({
  page: {
    padding: 10, 
  },
  subpage: {
    padding: 10, 
    gap: 20
  }
})

export default ExercizeGroupScreen; 