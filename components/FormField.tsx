import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants';

interface Props {
    fieldHeading: string,
    placeholder: string,
    handleChange?: (text: string) => void;
}

const FormField = ({ fieldHeading, placeholder, handleChange }: Props) => {

    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     console.log("Test", value);
    // })


    return (
        <>
            <Text className='text-textColor font-medium text-base'>{fieldHeading}</Text>
            <View className='h-[49px] mt-[10px] bg-cardBg flex flex-row items-center px-5 rounded-[10px] border focus:border-activeColor border-secondary'>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#124D87"
                    className='flex-1 text-sm font-normal text-textColor'
                    onChangeText={(text) => {
                        setValue(text);
                        if (handleChange) {
                            handleChange(text);
                        }
                    }}
                    secureTextEntry={fieldHeading === 'Password' && !showPassword}
                />
                 {
                    fieldHeading === 'Password' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                className="w-6 h-6"
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </>
    )
}

export default FormField