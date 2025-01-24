import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../hooks/useThemeColor'

interface Props {
    onPress: () => void,
    icon: keyof typeof Ionicons.glyphMap,
}

const MenuIconButton = ({ onPress, icon }: Props) => {
    const primaryColor = useThemeColor({}, 'primary')
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={icon} size={25} color={primaryColor} />
    </TouchableOpacity>
  )
}

export default MenuIconButton