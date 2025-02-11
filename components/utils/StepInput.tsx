import { Colors } from "@/constants/Colors";
import { texts } from "@/styles/texts";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StepInputProps {
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const StepInput = ({ value = 0, step = 1, min, max, onChange }: StepInputProps) => {
  const [internalValue, setInternalValue] = useState(value);

  const updateValue = (newValue: number) => {
    if ((min !== undefined && newValue < min) || (max !== undefined && newValue > max)) {
      return;
    }
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => updateValue(internalValue - step)}>
        <Text style={[texts.subLabel]}>-</Text>
      </TouchableOpacity>
      <Text style={[texts.subLabel]}>{internalValue}</Text>
      <TouchableOpacity style={styles.button} onPress={() => updateValue(internalValue + step)}>
        <Text style={[texts.subLabel]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10, 
    backgroundColor: Colors.cardBackground,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  value: {
    marginHorizontal: 10,
  },
});

export default StepInput;
