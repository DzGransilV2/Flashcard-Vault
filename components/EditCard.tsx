import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { router } from 'expo-router';

interface Card {
    id: string;
    answer: string;
    card_status: string;
    card_id: string;
    category_id: string;
    keywords: string;
    question: string;
    userID: string
}

interface EditCardProps {
    item: Card;
}

const EditCard: React.FC<EditCardProps> = ({ item }) => {

    const redirectToUpdate = () => {
        router.push({
            pathname: '/edit/[id]',
            params: {
                id: item.id
            }
        })
    }

    return (
        <View className='bg-cardBg h-[70px] mb-5 w-full px-5 flex flex-row items-center border-[1px] border-secondary rounded-[10px]'>
            <View className='w-[187px] mr-5 gap-1'>
                <Text className='text-white font-medium text-xl'>{item.question}</Text>
                <Text numberOfLines={1} className='text-white font-normal text-xs'>{item.answer}</Text>
            </View>
            <View className='flex flex-row gap-5'>
                <TouchableOpacity
                    activeOpacity={0.7}
                >
                    <Image
                        className='w-6 h-6'
                        source={icons.delete}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={redirectToUpdate}
                >
                    <Image
                        className='w-6 h-6'
                        source={icons.editing}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditCard