import { Image, Text, View } from 'react-native'
import React from 'react'

const Card = () => {
    return (
        <View className='bg-cardBg h-[150px] w-[150px] items-center justify-center border-[1px] border-secondary rounded-[10px]'>
            <Image 
                className='bg-white h-[50px] w-[50px]'
            />
            <Text className='text-white mt-[10px] font-semibold text-xl'>Text</Text>
        </View>
    )
}

export default Card