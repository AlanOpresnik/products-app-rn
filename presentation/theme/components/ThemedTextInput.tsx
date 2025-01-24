import { View, Text, TextInputProps, StyleSheet, TextInput, ViewStyle } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({ icon, style, ...rest }: Props) => {
    const viewStyle = StyleSheet.flatten([style]) as ViewStyle;
    const primaryColor = useThemeColor({}, 'primary')
    const textColor = useThemeColor({}, "text")
    const [isActive, setIsActive] = useState(false)
    const inputRef = useRef<TextInput>(null)
    return (
        <View
            onTouchStart={() => inputRef.current?.focus()}
            style={[{
                ...styles.border,
            }, viewStyle]}>

            {icon && (
                <Ionicons name={icon} size={24} color={textColor} style={{ marginRight: 10 }} />
            )}
            <TextInput
                ref={inputRef}
                style={{
                    color: textColor,
                    marginRight: 10,
                    flex: 1
                }}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                placeholderTextColor='#5c5c5c5c'

                {...rest}
            />
        </View>
    );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
