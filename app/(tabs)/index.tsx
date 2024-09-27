import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '@/components/SearchComponent'
import CategoryCard from '@/components/CategoryCard'
import { useFirebase } from '@/context/firebase'
import EmptyState from '@/components/EmptyState'

interface Category {
  category_id: string;
  categoryName: string;
  categoryImage: string;
}


interface DropdownItem {
  label: string;
  value: string[];
}

const Home = () => {

  const { fetchCategoriesByUserId, user } = useFirebase();
  const [data, setData] = useState<DropdownItem[]>([]);


  const fetchCategories = async () => {
    if (user) {
      const categories = await fetchCategoriesByUserId(user);
      const dropdownData = categories.map((category: Category) => ({
        label: category.categoryName,
        value: [category.category_id, category.categoryImage]
      }));
      setData(dropdownData);
    }
  };

  useEffect(() => {
    fetchCategories();
    // console.log(data);
    // console.log("USER HOME:",user);
  }, [user]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  }

  return (
    <>
      <SafeAreaView className='h-full bg-primary'>
        {/*Below was ScrollView but change to View*/}
        <View className='h-full mx-[40px]'>
          <View className='mt-10'>
            <SearchComponent />
          </View>
          {/* <View className='mt-[30px] mb'>
            <Text className='text-textColor text-xl font-semibold'>Categories</Text>
          </View> */}
          {/* <ScrollView className='h-[610px] w-full'> */}
            <View className='mt-5 flex flex-row flex-wrap justify-between w-full '>
              {/* {data.map((item, index) => (
                <CategoryCard key={index} category_image={item.value[1]} category_name={item.label} />
              ))} */}
              <FlatList
              data={data}
              keyExtractor={(item) => item.value[0]}
              renderItem={({ item }) => (
                <CategoryCard
                  category_image={item.value[1]}
                  category_name={item.label}
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
                  <Text className='text-textColor text-xl font-semibold'>Categories</Text>
                </View>
              )}
              numColumns={2} // Specify the number of columns
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }} // Add spacing between columns
              refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
              style={{ flex: 1, height:647 }}
            />
            </View>
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
      <StatusBar
        backgroundColor='#121212'
        style='light'
      />
    </>
  )
}

export default Home