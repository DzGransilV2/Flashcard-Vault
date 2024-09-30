import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFirebase } from '@/context/firebase'
import { router } from 'expo-router'

interface userDataProps {
  userName: string;
  userEmail: string;
  userId: string;
}

interface CategoryProps {
  categoryName: string;
  categoryCards: number;
}

interface countDataProps {
  cards: number;
  categories: number;
  correct: number;
  wrong: number;
  good: number;
  ok: number;
  bad: number;
  categoriesWithCardCount: CategoryProps[]; // Array of categories
}


const Analytics = () => {

  const [data, setData] = useState<userDataProps | null>(null);

  const [count, setCount] = useState<countDataProps | null>(null);

  const { user, countOfCardsAndCategories, setUser, signOut } = useFirebase();

  const fetchUserDetails = async () => {
    try {
      const userLocalStore = await AsyncStorage.getItem('userData');
      if (userLocalStore !== null) {
        const userD = JSON.parse(userLocalStore)
        if (user === userD.userId) {
          setData(userD)
        }
        console.log("USER DETAILS", data);
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error retrieving user data", error);
    }
  };

  const fetchCollectionCount = async () => {
    try {
      const response = await countOfCardsAndCategories(user);
      console.log(response)
      setCount(response)
    } catch (error) {
      console.error("Error fetching count", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchCollectionCount();
  }, [user])

  const logout = async () => {
    try {
      const response = await signOut();
      setUser(null);
      router.replace('/(auth)/sign-in');
      Alert.alert("Success", response);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserDetails();
    await fetchCollectionCount();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView
        className='h-full mx-[40px]'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className='flex flex-row items-center justify-between mt-10'>
          <View>
            {data ? (
              <>
                <Text className='text-textColor font-semibold text-2xl'>{data.userName}</Text>
                <Text className='text-textColor font-normal text-base'>{data.userEmail}</Text>
              </>
            ) : (
              <Text className='text-textColor font-normal text-base'>Loading user data...</Text>
            )}
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={logout}>
            <Image
              source={icons.logout}
              className='h-6 w-6'
              resizeMode='contain'
              style={{ tintColor: '#124D87' }}
            />
          </TouchableOpacity>
        </View>
        <View className='mt-[50px]'>
          <View className='w-[330px] h-[150px] p-5 bg-cardBg border border-secondary rounded-[10px] items-center justify-center'>
            <View className='flex flex-row justify-around w-full'>
              <View>
                <Text className='text-textColor font-semibold text-base'>Quiz Status</Text>
                <View className='mt-[10px] ml-[5px]'>
                  <View className='flex flex-row'>
                    <Text className='text-greenBrightBg font-medium text-base'>Correct:</Text>
                    <Text className='text-greenBrightBg font-medium text-base ml-[5px]'>{count?.correct}</Text>
                  </View>
                  <View className='flex flex-row'>
                    <Text className='text-redBrightBg font-medium text-base'>Wrong:</Text>
                    <Text className='text-redBrightBg font-medium text-base ml-[5px]'>{count?.wrong}</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text className='text-textColor font-semibold text-base'>Learning Status</Text>
                <View className='mt-[10px] ml-[5px]'>
                  <View className='flex flex-row'>
                    <Text className='text-greenBrightBg font-medium text-base'>Good:</Text>
                    <Text className='text-greenBrightBg font-medium text-base ml-[5px]'>{count?.good}</Text>
                  </View>
                  <View className='flex flex-row'>
                    <Text className='text-yellowBrightBg font-medium text-base'>Ok:</Text>
                    <Text className='text-yellowBrightBg font-medium text-base ml-[5px]'>{count?.ok}</Text>
                  </View>
                  <View className='flex flex-row'>
                    <Text className='text-redBrightBg font-medium text-base'>Bad:</Text>
                    <Text className='text-redBrightBg font-medium text-base ml-[5px]'>{count?.bad}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='mt-5'>
            <Text className='text-textColor font-semibold text-base'>General Information</Text>
            <View className='mt-[10px] ml-[5px]'>
              <View className='flex flex-row'>
                <Text className='text-textColor font-medium text-base'>Total Cards:</Text>
                <Text className='text-textColor font-medium text-base ml-[5px]'>{count?.cards}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='text-textColor font-medium text-base'>Total Categories:</Text>
                <Text className='text-textColor font-medium text-base ml-[5px]'>{count?.categories}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='mt-5'>
          <Text className='text-textColor font-semibold text-base'>Category Information</Text>
          <View className='mt-[10px]'>
            {count?.categoriesWithCardCount && (
              <>
                {count.categoriesWithCardCount.map((item, index) => (
                  <View
                    key={index}
                    className='bg-cardBg h-[50px] mb-[10px] w-full px-5 flex flex-row items-center justify-between border-[1px] border-secondary rounded-[10px]'
                  >
                    <View>
                      <Text className='text-white font-medium text-base'>
                        Name: {item.categoryName}
                      </Text>
                    </View>
                    <View className='ml-5'>
                      <Text className='text-white font-medium text-base'>
                        Cards: {item.categoryCards}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Analytics