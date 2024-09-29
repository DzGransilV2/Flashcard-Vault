import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { router } from 'expo-router';
import { useFirebase } from '@/context/firebase';

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

    const { deleteCard } = useFirebase();

    const redirectToUpdate = () => {
        router.push({
            pathname: '/edit/[id]',
            params: {
                id: item.id
            }
        })
    }

    const deleteFlashcard = async () => {
        try {
            Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this flashcard?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Delete cancelled"),
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            try {
                                const response = await deleteCard(item.userID, item.card_id, item.category_id);
                                Alert.alert("Delete Success", response);
                            } catch (error) {
                                console.log("Error during deletion", error);
                            }
                        },
                        style: "destructive"
                    }
                ],
                { cancelable: true }
            );
            // const response = await deleteCard(item.userID, item.card_id, item.category_id);
            // Alert.alert("Delete Success", response)
        } catch (error) {
            console.log("DELETE from CLient", error)
        }
    }

    return (
        <View className='bg-cardBg h-[70px] mb-5 w-full px-5 flex flex-row items-center justify-between border-[1px] border-secondary rounded-[10px]'>
            <View className='w-[187px] gap-1'>
                <Text className='text-white font-medium text-xl'>{item.question}</Text>
                <Text numberOfLines={1} className='text-white font-normal text-xs'>{item.answer}</Text>
            </View>
            <View className='flex flex-row gap-5'>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={deleteFlashcard}
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