import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    title: string,
    handlePress?: () => void,
    containerStyle?: string,
    textStyles?: string,
    isLoading?: boolean
}

const CustomBtn = ({ title, handlePress, containerStyle, textStyles, isLoading }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePress}
            className={`bg-cardBg rounded-[10px] border border-secondary justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text className={`text-secondary font-semibold ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomBtn