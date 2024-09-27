import { Image, Text, View } from 'react-native'
import React from 'react'

interface Props{
    category_image:string;
    category_name:string;
}

const CategoryCard = ({category_image, category_name}:Props) => {
    return (
        <View className='bg-cardBg h-[150px] w-[150px] items-center justify-center border-[1px] border-secondary rounded-[10px]'>
            <Image 
                className='bg-white h-[50px] w-[50px] rounded-[10px]'
                source={{uri:category_image}}
                resizeMode='cover'
            />
            <Text className='text-textColor mt-[10px] font-semibold text-xl'>{category_name}</Text>
        </View>
    )
}

export default CategoryCard