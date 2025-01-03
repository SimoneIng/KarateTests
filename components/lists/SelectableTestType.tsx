import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDBStore } from '@/database/state';
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';
import {  } from '@/database/types';

interface Item {
  testTypeString: string, 
  isSelected: boolean;
  onClick: (type: string) => void;
}

interface ListProps {
    onSelection: (type: string) => void; 
}

const TestType = ({ testTypeString, isSelected, onClick }: Item) => {
  return (
    <TouchableOpacity
      style={[
        styles.groupCard,
        {
          backgroundColor: isSelected ? Colors.accent : Colors.cardBackground,
        },
      ]}
      onPress={() => onClick(testTypeString)} // Passa l'ID del gruppo selezionato
    >
      <Text style={[texts.subLabel, styles.label]}>{testTypeString}</Text>
    </TouchableOpacity>
  );
};

const SelectableTestType = ({ onSelection }: ListProps) => {

  const { test_types } = useDBStore();

  // Stato per tracciare il gruppo selezionato
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);

  const handleGroupSelection = (testType: string) => {
    setSelectedTestType(selectedTestType === testType ? null : testType);
    onSelection(testType); 
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        horizontal={true}
        data={test_types}
        renderItem={({ item }) => (
          <TestType
            testTypeString={item.enum_value}
            isSelected={item.enum_value === selectedTestType} // Controlla se è il gruppo selezionato
            onClick={handleGroupSelection}
          />
        )}
        keyExtractor={(item) => item.enum_value}
      />
    </View>
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
