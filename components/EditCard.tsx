import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const EditCard = () => {
    return (
        <View className='bg-cardBg h-[70px] w-full px-5 flex flex-row items-center border-[1px] border-secondary rounded-[10px]'>
            <View className='w-[187px] mr-5'>
                <Text className='text-white font-medium text-xl'>Text</Text>
            </View>
            <View className='flex flex-row gap-5'>
                <Image
                    className='w-6 h-6'
                    source={icons.delete}
                    resizeMode='cover'
                />
                <Image
                    className='w-6 h-6'
                    source={icons.editing}
                    resizeMode='cover'
                />
            </View>
        </View>
    )
}

export default EditCard