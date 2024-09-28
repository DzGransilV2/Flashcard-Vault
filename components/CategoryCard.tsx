import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

interface Props{
    category_image:string;
    category_name:string;
    category_id:string;
}

const CategoryCard = ({category_image, category_name, category_id}:Props) => {

    const categoryCards = (category_id:string, category_name:string) => {
        router.push({
            pathname: '/flashcard/[id]',
            params: { 
              id: category_id,
              category_name: category_name
            },
          });
          
    }

    return (
        <TouchableOpacity 
        onPress={()=>categoryCards(category_id, category_name)}
        activeOpacity={0.7} 
        className='bg-cardBg h-[150px] w-[150px] items-center justify-center border-[1px] mb-5 border-secondary rounded-[10px]'>
            <Image 
                className=' h-[50px] w-[50px] rounded-[10px]'
                source={{uri:category_image}}
                resizeMode='cover'
            />
            <Text className='text-textColor mt-[10px] font-semibold text-xl'>{category_name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard