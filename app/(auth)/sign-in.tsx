import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import CustomBtn from '@/components/CustomBtn'
import { useFirebase } from '@/context/firebase'

const SignIn = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    //   const {setUser, setIsLoggedIn} = useGlobalContext();

    const { signIn } = useFirebase();

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
            return
        }
        setIsSubmitting(true)
        try {
            const result = await signIn({ email: form.email, password: form.password });
            console.log("SignIn success", result.user.displayName)
            //   setUser(result);
            //   setIsLoggedIn(true);
            router.replace('/(tabs)/');
            Alert.alert("Success", "Sign In successful");
        } catch (error) {
            Alert.alert('Error', 'Got error in signIn but client side');
            console.log("Error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEmailChange = (text: string) => {
        setForm({ ...form, email: text });
    };

    const handlePasswordChange = (text: string) => {
        setForm({ ...form, password: text });
    };


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Text className="text-2xl text-white mt-10 font-psemibold">Login to FlashCard Vault</Text>
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
                        title="Sign In"
                        handlePress={submit}
                        containerStyle="mt-7 h-[50px]"
                        textStyles='text-xl'
                        isLoading={isSubmitting}
                    />
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
                        <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn