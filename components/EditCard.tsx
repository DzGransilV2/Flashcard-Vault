import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
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

    // Loading state specific to this card
    const [loading, setLoading] = useState(false);

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
                        onPress: () => {
                            console.log("Cancelled");
                        },
                        style: "cancel"
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            setLoading(true);
                            try {
                                const response = await deleteCard(item.userID, item.card_id, item.category_id);
                                Alert.alert("Delete Success", response);
                            } catch (error) {
                                console.log("Error during deletion", error);
                            } finally {
                                setLoading(false);  // Stop loading after deletion is complete
                            }
                        },
                        style: "destructive"
                    }
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.log("DELETE from Client", error);
        }
    };


    return (
        <View className='bg-cardBg h-[70px] mb-5 w-full px-5 flex flex-row items-center justify-between border-[1px] border-secondary rounded-[10px]'>

            {!loading ? (
                <>
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
                </>
            ) : (
                <View className='h-[70px] w-full items-center justify-center'>
                    <View className="justify-center items-center">
                        <ActivityIndicator size="large" color="#124D87" className="" />
                    </View>
                </View>
            )}

        </View>
    )
}

export default EditCard
