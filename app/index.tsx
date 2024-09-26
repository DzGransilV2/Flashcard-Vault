import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBtn from '@/components/CustomBtn';
import { StatusBar } from 'expo-status-bar';
// import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

    //   const {isLoading, isLoggedIn} = useGlobalContext();

    //   if(!isLoading && isLoggedIn){
    //     return <Redirect href="/home"/>
    //   }


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