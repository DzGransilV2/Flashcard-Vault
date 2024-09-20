import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '@/components/SearchComponent'
import Card from '@/components/Card'

const Home = () => {
  return (
    <>
      <SafeAreaView className='h-full bg-primary'>
        <ScrollView className='h-full mx-[40px]'>
          <View className='mt-10'>
            <SearchComponent />
          </View>
          <Text className='text-white mt-[30px] text-xl font-semibold'>Categories</Text>
          <View className='mt-5'>
            <Card/>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar
        backgroundColor='#121212'
        style='light'
      />
    </>
  )
}

export default Home