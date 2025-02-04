import { TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { texts } from '@/styles/texts'
import { Colors } from '@/constants/Colors'

interface Props {
    placeholder: string, 
    secureText?: boolean, 
    value?: string, 
    onChange: (value: string) => void, 
}

const CustomInput = ({ placeholder, secureText, value, onChange }:Props) => {

    const [focus, setFocus] = useState<boolean>(false); 

    return (
        <TextInput style={[styles.input, texts.subLabel, 
            focus ? { borderColor: '#cc' } : { borderColor: '#ccc' }
        ]}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} 
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureText}
            placeholderTextColor={Colors.primary}
            onChangeText={(string) => onChange(string)}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10, 
        paddingVertical: 15,
        color: 'black',
        borderWidth: 1, 
        borderRadius: 8, 
    }
})

export default CustomInput