import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDBStore } from '@/database/state';
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';
import { TestType } from '@/database/types';
import { FlashList } from '@shopify/flash-list';

interface Item {
  testType: TestType; 
  isSelected: boolean;
  onClick: (type: TestType) => void;
}

interface ListProps {
    onSelection: (type: TestType) => void; 
}

const TestTypeElement = ({ testType, isSelected, onClick }: Item) => {
  return (
    <TouchableOpacity
      style={[
        styles.groupCard,
        {
          backgroundColor: isSelected ? Colors.accent : Colors.cardBackground,
        },
      ]}
      onPress={() => onClick(testType)} // Passa l'ID del gruppo selezionato
    >
      <Text style={[texts.subLabel, styles.label]}>{testType.enum_value}</Text>
    </TouchableOpacity>
  );
};

const SelectableTestType = ({ onSelection }: ListProps) => {

  const { test_types } = useDBStore();

  // Stato per tracciare il gruppo selezionato
  const [selectedTestType, setSelectedTestType] = useState<TestType | null>(null);

  const handleTestTypeSelection = (testType: TestType) => {
    setSelectedTestType(selectedTestType === testType ? null : testType);
    onSelection(testType); 
  };

  return (
    <FlatList
      // estimatedItemSize={40}
      contentContainerStyle={styles.list}
      horizontal={true}
      data={test_types}
      renderItem={({ item }) => (
        <TestTypeElement
          testType={item}
          isSelected={item === selectedTestType} // Controlla se è il gruppo selezionato
          onClick={handleTestTypeSelection}
        />
      )}
      keyExtractor={(item) => item.enum_value}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.primary,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  groupCard: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
});

export default SelectableTestType;
