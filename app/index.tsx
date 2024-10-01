import { ScrollView, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '@/components/CustomBtn';
import { StatusBar } from 'expo-status-bar';
import { useFirebase } from '@/context/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { images } from '@/constants';

export default function App() {

    const { user, setUser } = useFirebase();

    const [redirect, setRedirect] = useState(false);

    const redirectLoggedIn = async () => {
        const userData: string | null = await AsyncStorage.getItem('userData');
        if (userData !== null) {
            const userD = JSON.parse(userData);
            if (userD.userId) {
                setUser(userD.userId);
                setRedirect(!redirect);
            }
        }
    }

    useEffect(() => {
        redirectLoggedIn();
    }, [user])

    if (redirect) {
        return <Redirect href="/(tabs)/" />
    }


    return (
        <ImageBackground
            source={images.main2}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="h-full">
                <View className='h-full items-center justify-center'>
                    {/* <Text className='text-textColor font-black text-2xl mt-52'>Welcome to Flashcard-Vault</Text> */}
                    <View
                        className='bg-primary w-[230px] h-[50px] items-center justify-center rounded-[10px]'
                    >
                        <CustomBtn
                            title="Continue with Email"
                            handlePress={() => router.push('/sign-in')}
                            containerStyle="w-[230px] h-[50px]"
                            textStyles='text-xl'
                        />
                    </View>
                    <Text className='text-textColor font-normal text-xm absolute bottom-5'>Created by DzGransil</Text>
                </View>
            </SafeAreaView>
            <StatusBar
                backgroundColor='#121212'
                style='light'
            />
        </ImageBackground>
    );
}