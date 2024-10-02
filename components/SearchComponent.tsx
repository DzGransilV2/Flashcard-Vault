import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'

interface queryProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchComponent: React.FC<queryProps> = ({ query, setQuery }) => {

    // const [query, setQuery] = useState('');

    return (
        <View className='h-[53px] w-full max-w-[330px] items-center justify-between rounded-[10px] px-5 border-[1px] border-secondary focus:border-activeColor flex-row'>
            {/* <Text className='text-secondary'>Type here to search...</Text> */}
            <TextInput
                className="text-base text-white flex-1"
                value={query}
                placeholder='Type here to search...'
                placeholderTextColor='#124D87'
                onChangeText={(text) => setQuery(text)}
            />
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    if (!query) {
                        return Alert.alert('Missing Query', "Please input something to search");
                    }
                }}
            >
                <Image
                    source={icons.search}
                    className='h-7 w-7'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchComponent