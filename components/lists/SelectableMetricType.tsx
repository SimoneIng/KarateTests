import { StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { ExercizeMetrics } from '@/database/types';
import { Colors } from '@/constants/Colors';
import { texts } from '@/styles/texts';

interface ItemProps {
  metric: string, 
  isSelected: boolean, 
  onSelect: () => void, 
}

interface ListProps {
  elements: ExercizeMetrics,  
  selectedItem: string,  
  onSelectMetric: (metric: string) => void;  
}

const Item = React.memo(({ metric, isSelected, onSelect }: ItemProps) => {

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.item, { backgroundColor: isSelected ? Colors.accent : Colors.cardBackground }]}
    >
      <Text style={texts.tinyLabel}>{metric}</Text>
    </TouchableOpacity>
  );
});

const SelectableMetricType = ({ elements, selectedItem, onSelectMetric }: ListProps) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(selectedItem);

  useEffect(() => {
    if (selectedMetric !== null) {
      onSelectMetric(selectedMetric);
    }
  }, [selectedMetric, onSelectMetric]);

  const handleSelect = useCallback((metric: string) => {
      setSelectedMetric(metric);
  }, []);

  return (
    <FlatList
      horizontal
      data={elements}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Item metric={item} isSelected={selectedMetric === item} onSelect={() => handleSelect(item)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    borderRadius: 10, 
    marginHorizontal: 5, 
  }
});

export default SelectableMetricType;
