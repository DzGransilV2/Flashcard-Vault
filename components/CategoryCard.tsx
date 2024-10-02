import { Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';

interface Props {
    category_image: string;
    category_name: string;
    category_id: string;
}

const CategoryCard = ({ category_image, category_name, category_id }: Props) => {

    const categoryCards = (category_id: string, category_name: string) => {
        router.push({
            pathname: '/flashcard/[id]',
            params: {
                id: category_id,
                category_name: category_name
            },
        });

    }

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenWidth(window.width);
        });

        return () => subscription?.remove();
    }, []);

    const boxHeight = screenWidth < 640 ? 130 : screenWidth < 768 ? 130 : 150;
    const boxWidth = screenWidth < 640 ? 130 : screenWidth < 768 ? 130 : 150;

    return (
        <TouchableOpacity
            onPress={() => categoryCards(category_id, category_name)}
            activeOpacity={0.7}
            className={`bg-cardBg h-[${boxHeight}px] w-[${boxWidth}px] items-center justify-center border mb-5 border-secondary rounded-[10px] p-5`}
        >
            <Image
                className=' h-[50px] w-[50px] rounded-[10px]'
                source={{ uri: category_image }}
                resizeMode='cover'
            />
            <Text className='text-textColor mt-[10px] font-semibold text-xl'>{category_name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard