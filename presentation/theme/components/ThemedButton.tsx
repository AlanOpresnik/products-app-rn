import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Pressable, PressableProps } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends PressableProps {
  icon: keyof typeof Ionicons.glyphMap;
  children: string;
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? primaryColor + '90' : primaryColor,
        },
        styles.buttonBackground,
      ]}
      {...rest}
    >
      {icon && <Ionicons  name={icon} size={24} color={'white'} />}
      <Text style={{
        color: 'white',
        fontSize: 20,
      }}>{children}</Text>
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  buttonBackground: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    gap: 10,
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
  textStyle: {
    color: "",
  },
});
