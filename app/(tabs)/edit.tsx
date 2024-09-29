import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchComponent from '@/components/SearchComponent'
import EditCard from '@/components/EditCard'
import { useFirebase } from '@/context/firebase'

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


const Edit = () => {

  const { user, fetchAllCards } = useFirebase();

  const [data, setData] = useState<Card[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetchAllCards(user);
      setData(response)
    } catch (error) {
      console.log(error)
    } finally {

    }
  }

  useEffect(() => {
    fetchData();
  }, [user, data])

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <View className='h-full mx-[40px]'>
        <View className='mt-10'>
          <SearchComponent />
        </View>
        <Text className='text-textColor mt-[30px] text-xl font-semibold'>Edit Cards</Text>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          className='mt-5'>
          {
            data.map((item, index) => (
              <EditCard key={index} item={item} />
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Edit