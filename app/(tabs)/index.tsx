import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SearchComponent from '@/components/SearchComponent'
import CategoryCard from '@/components/CategoryCard'
import { useFirebase } from '@/context/firebase'

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
    console.log(data)
  }, [user]);

  return (
    <>
      <SafeAreaView className='h-full bg-primary'>
        <ScrollView className='h-full mx-[40px]'>
          <View className='mt-10'>
            <SearchComponent />
          </View>
          <Text className='text-textColor mt-[30px] text-xl font-semibold'>Categories</Text>
          <View className='mt-5 flex flex-row flex-wrap justify-between'>
            {data.map((item, index) => (
              <>
                <CategoryCard key={index} category_image={item.value[1]} category_name={item.label}/>
              </>
            ))}
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