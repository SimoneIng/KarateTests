import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { texts } from '@/styles/texts';
import { Colors } from '@/constants/Colors';

interface SwitchProps<T> {
  labelX: string;
  labelY: string;
  value: T;
  onChange: (newValue: T) => void;
  optionX: T;
  optionY: T;
}

const Switch = <T,>({ labelX, labelY, value, onChange, optionX, optionY }: SwitchProps<T>) => {
  
  const [selectedValue, setSelectedValue] = useState(value); 

  const handlePress = (option: T) => {
    setSelectedValue(option),
    onChange(option) 
  }

  useEffect(() => {
    value = selectedValue; 
  }, [selectedValue])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, value === optionX && styles.current]}
        onPress={() => handlePress(optionX)}
      >
        <Text style={[texts.subLabel]}>{labelX}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, value === optionY && styles.current]}
        onPress={() => handlePress(optionY)}
      >
        <Text style={[texts.subLabel]}>{labelY}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  current: {
    backgroundColor: Colors.cardBackground,
  },
});

export default Switch;
