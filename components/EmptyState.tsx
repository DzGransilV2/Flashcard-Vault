import { View, Text, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

interface Props{
    title:string;
    subtitle:string;
}

const EmptyState = ({ title, subtitle }:Props) => {
    return (
        <View className="justify-center items-center px-4 h-[500px]">
            <Text className="font-semibold text-xl text-center mt-2 text-white">
                {title}
            </Text>
            <Text className="font-medium text-sm text-gray-100 text-center">
                {subtitle}
            </Text>
        </View>
    )
}

export default EmptyState