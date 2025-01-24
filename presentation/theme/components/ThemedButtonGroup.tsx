import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '../hooks/useThemeColor'

interface Props {
    options: string[]
    selectedOptions: string[]
    onSelect: (option: string) => void
}

const ThemedButtonGroup = ({ onSelect, options, selectedOptions }: Props) => {
    const primaryColor = useThemeColor({}, 'primary')
    return (
        <View style={style.container}>
            {options.map(option => (
                <TouchableOpacity onPress={() => onSelect(option)} style={[style.button, selectedOptions.includes(option) && {
                    backgroundColor: primaryColor
                }]} key={option}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={[style.buttonText, selectedOptions.includes(option) && style.selectedButtonText
                    ]}>{option[0].toUpperCase() + option.slice(1)}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default ThemedButtonGroup

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonText: {
        fontSize: 16
    },
    selectedButtonText: {
        color: 'white'
    }
})