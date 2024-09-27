import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '@/components/CustomBtn';
import { StatusBar } from 'expo-status-bar';
import { useFirebase } from '@/context/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {

    const { user, setUser } = useFirebase();

    const [redirect, setRedirect]=useState(false);

    const redirectLoggedIn = async () => {
        const userData: string | null = await AsyncStorage.getItem('userData');
        if (userData !== null) {
            const userD = JSON.parse(userData);
            if(userD.userId){
                setUser(userD.userId);
                setRedirect(!redirect);
            }
        }
    }

    useEffect(()=>{
        redirectLoggedIn();
    }, [user])

    if (redirect) {
        return <Redirect href="/(tabs)/" />
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full items-center justify-center px-4">
                    <CustomBtn
                        title="Continue with Email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyle="w-[230px] h-[50px]"
                        textStyles='text-xl'
                    />
                </View>
            </ScrollView>
            <StatusBar
                backgroundColor='#121212'
                style='light'
            />
        </SafeAreaView>
    );
}