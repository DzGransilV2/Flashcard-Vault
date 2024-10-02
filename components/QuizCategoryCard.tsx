import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

interface QuizCategoryCardProps {
    category_name: string;
    category_image: string;
    category_id: string;
}

const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({ category_name, category_image, category_id }) => {

    const handleRedirectToQuiz = async () => {
        console.log("category_id:", category_id)
        router.push({
            pathname: '/quiz/[id]',
            params: {
                id: category_id,
                category_name: category_name
            }
        })
    }

    return (
        <TouchableOpacity onPress={handleRedirectToQuiz} activeOpacity={0.7} className='bg-cardBg h-[70px] mb-5 w-full px-5 flex flex-row items-center justify-center border border-secondary rounded-[10px]'>
            <View>
                <Image
                    source={{ uri: category_image }}
                    className='w-8 h-8 mr-[10px] rounded-[10px] '
                    resizeMode='cover'
                />
            </View>
            <View>
                <Text className='text-white font-medium text-xl'>{category_name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default QuizCategoryCard;
