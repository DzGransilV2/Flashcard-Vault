import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchComponent from '@/components/SearchComponent'
import EditCard from '@/components/EditCard'
import { useFirebase } from '@/context/firebase'
import EmptyState from '@/components/EmptyState'

interface Card {
  id: string;
  answer: string;
  card_status: string;
  card_id: string;
  category_id: string;
  keywords: string;
  question: string;
  userID: string;
}

const Edit = () => {
  const { user, fetchAllCards } = useFirebase();

  const [data, setData] = useState<Card[]>([]);
  const [filteredData, setFilteredData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  // Fetch all cards for the user
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchAllCards(user);
      setData(response);
      setFilteredData(response); // Initialize with all data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // Filter cards based on the search query
  useEffect(() => {
    if (query) {
      const filtered = data.filter((item) =>
        // Check if the query matches the question or keywords (case insensitive)
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to all cards when query is empty
    }
  }, [query, data]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="h-full mx-[40px]">
        <View className='mt-10 items-center justify-center'>
          {/* Search component */}
          <SearchComponent query={query} setQuery={setQuery} />
        </View>
        <Text className="text-textColor mt-[30px] text-xl font-semibold">Edit Cards</Text>
        {
          !loading ?
            (
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                className="mt-5 h-[589px]"
              >
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <EditCard key={index} item={item} />
                  ))
                ) : (
                  <EmptyState
                    title="No cards found"
                    subtitle="Start your learning journey by adding your first flashcard!"
                  />
                )}
              </ScrollView>
            ) : (
              <View className='h-[600px]'>
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" color="#124D87" />
                </View>
              </View>
            )
        }
      </View>
    </SafeAreaView>
  );
};

export default Edit;
