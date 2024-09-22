import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchComponent from '@/components/SearchComponent'
import EditCard from '@/components/EditCard'

const Edit = () => {
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='h-full mx-[40px]'>
      <View className='mt-10'>
        <SearchComponent/>
      </View>
      <Text className='text-textColor mt-[30px] text-xl font-semibold'>Edit Cards</Text>
      <View className='mt-5'>
        <EditCard/>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Edit