import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'


interface Props {
    fieldHeading: string,
    placeholder: string
}

const FormField = ({ fieldHeading, placeholder }: Props) => {

    const [value, setValue] = useState("")

    return (
        <>
            <Text className='text-textColor font-medium text-base'>{fieldHeading}</Text>
            <View className='h-[49px] mt-[10px] bg-cardBg justify-center px-5 rounded-[10px] border-[1px] border-secondary'>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#124D87"
                    className='text-sm font-normal text-white'
                    onChangeText={(text) => setValue(text)}
                />
            </View>
        </>
    )
}

export default FormField