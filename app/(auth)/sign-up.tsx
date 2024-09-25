import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { images } from '../../constants'
import FormField from '../../components/FormField'
// import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import CustomBtn from '@/components/CustomBtn'
// import { createUser } from '../../lib/appwrite'
// import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    //   const {setUser, setIsLoggedIn} = useGlobalContext();

    const handleUsernameChange = (text: string) => {
        setForm({ ...form, username: text });
    };

    const handleEmailChange = (text: string) => {
        setForm({ ...form, email: text });
    };

    const handlePasswordChange = (text: string) => {
        setForm({ ...form, password: text });
    };

    const submit = async () => {
        if (!form.email || !form.password || !form.username) {
            Alert.alert('Error', 'Please fill in all the fields');
        }
        // setIsSubmitting(true)
        // try{
        //   const result = await createUser(form.email, form.password, form.username);
        //   setUser(result);
        //   setIsLoggedIn(true);
        //   router.replace('/home');
        // }catch(error){
        //   Alert.alert('Error', error.message);
        // }finally{
        //   setIsSubmitting(false)
        // } 
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Text className="text-2xl text-white mt-10 font-psemibold">Sign up to FlashCard Vault</Text>
                    <FormField
                        fieldHeading='Username'
                        placeholder='Type your username here...'
                        handleChange={handleUsernameChange}
                    />
                    <FormField
                        fieldHeading='Email'
                        placeholder='Type your email here...'
                        handleChange={handleEmailChange}
                    />
                    <FormField
                        fieldHeading='Password'
                        placeholder='Type your password here...'
                        handleChange={handlePasswordChange}
                    />
                    <CustomBtn
                        title="Sign Up"
                        handlePress={submit}
                        containerStyle="mt-7 h-[50px]"
                        textStyles='text-xl'
                        isLoading={isSubmitting}
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
                        <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp