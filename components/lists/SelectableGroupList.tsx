import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDBStore } from '@/database/state';
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';
import { AthleteGroup } from '@/database/types';

interface Item {
  group: AthleteGroup;
  isSelected: boolean;
  onClick: (id: number) => void;
}

interface ListProps {
    onSelection: (id: number) => void; 
}

const SelectableGroup = ({ group, isSelected, onClick }: Item) => {
  return (
    <TouchableOpacity
      style={[
        styles.groupCard,
        {
          backgroundColor: isSelected ? Colors.accent : Colors.cardBackground,
        },
      ]}
      onPress={() => onClick(group.group_id)} // Passa l'ID del gruppo selezionato
    >
      <Text style={[texts.subLabel, styles.label]}>{group.group_name}</Text>
    </TouchableOpacity>
  );
};

const SelectableGroupList = ({ onSelection }: ListProps) => {
  const { groups } = useDBStore();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const handleGroupSelection = (id: number) => {
    setSelectedGroupId(selectedGroupId === id ? null : id);
    onSelection(id); 
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        horizontal={true}
        data={groups}
        renderItem={({ item }) => (
          <SelectableGroup
            group={item}
            isSelected={item.group_id === selectedGroupId} // Controlla se è il gruppo selezionato
            onClick={handleGroupSelection}
          />
        )}
        keyExtractor={(item) => item.group_id.toString()}
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

export default SelectableGroupList;
