import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchComponent from '@/components/SearchComponent'

const Create = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='h-full mx-[40px]'>
        <Text className='text-textColor mt-[30px] text-xl font-semibold'>Create</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create