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

    const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

    const [windowDimensions, setWindowDimensions] = useState({
        width: initialWidth,
        height: initialHeight,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setWindowDimensions({
                width: window.width,
                height: window.height,
            });
        });
        return () => {
            subscription?.remove();
        };
    }, []);

    const { width, height } = windowDimensions;

    // const boxHeight = screenWidth < 640 ? 130 : screenWidth < 768 ? 130 : 150;
    // const boxWidth = screenWidth < 640 ? 130 : screenWidth < 768 ? 130 : 150;

    const boxHeight = height > 800 ? 'h-[150]' : 'h-[130]';
    const boxWidth = width > 400 ? 'w-[150]' : 'w-[130]';

    return (
        <TouchableOpacity
            onPress={() => categoryCards(category_id, category_name)}
            activeOpacity={0.7}
            className={`bg-cardBg ${boxHeight} ${boxWidth} items-center justify-center border mb-5 border-secondary rounded-[10px] p-5`}
        >
            <Image
                className=' h-[50px] w-[50px] rounded-[10px]'
                source={{ uri: category_image }}
                resizeMode='cover'
            />
            <Text numberOfLines={1} className='text-textColor mt-[10px] font-semibold text-xl'>{category_name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard