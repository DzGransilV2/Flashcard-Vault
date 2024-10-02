import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchComponent from '@/components/SearchComponent'
import { useFirebase } from '@/context/firebase';
import CategoryCard from '@/components/CategoryCard';
import EmptyState from '@/components/EmptyState';
import QuizCategoryCard from '@/components/QuizCategoryCard';



interface Category {
  category_id: string;
  categoryName: string;
  categoryImage: string;
}


interface DropdownItem {
  label: string;
  value: string[];
}


const Quiz = () => {

  const { fetchCategoriesByUserId, user } = useFirebase();
  const [data, setData] = useState<DropdownItem[]>([]);

  const [filteredData, setFilteredData] = useState<DropdownItem[]>([]);
  const [query, setQuery] = useState('');


  const fetchCategories = async () => {
    if (user) {
      const categories = await fetchCategoriesByUserId(user);
      const dropdownData = categories.map((category: Category) => ({
        label: category.categoryName,
        value: [category.category_id, category.categoryImage]
      }));
      setData(dropdownData);
      setFilteredData(dropdownData);
    }
  };

  useEffect(() => {
    fetchCategories();
    console.log("DATA:::", data);
    console.log("USER QUIZ:::", user);
  }, [user]);

  useEffect(() => {
    // Filter the data based on the search query
    if (query) {
      const filtered = data.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);  // Reset to all categories when query is empty
    }
  }, [query, data]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='h-[calc(100%-84px)] bg-primary'>
      <View className='h-full mx-[40px]'>
        <View className='mt-10 items-center justify-center'>
          <SearchComponent query={query} setQuery={setQuery} />
        </View>
        <View className='flex flex-col flex-grow'>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            keyExtractor={(item) => item.value[0]}
            renderItem={({ item }) => (
              <QuizCategoryCard
                category_name={item.label}
                category_image={item.value[1]}
                category_id={item.value[0]}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyState
                title='No cards found'
                subtitle='Start your learning journey by adding your first flashcard!'
              />
            )}
            ListHeaderComponent={() => (
              <View className='mt-[30px] mb-5'>
                <Text className='text-textColor text-xl font-semibold'>Quiz</Text>
              </View>
            )}
            numColumns={1}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Quiz