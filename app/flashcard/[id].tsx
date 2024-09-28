import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Animated, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';
import { useFirebase } from '@/context/firebase';

const Flashcard = () => {

  const { id, category_name } = useLocalSearchParams();

  // console.log(id)

  const [isFlipped, setIsFlipped] = useState(false); // To track the flip state
  const animatedValue = useRef(new Animated.Value(0)).current; // Animated value for flipping

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0, // Flipping back to front
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsFlipped(false);
    } else {
      Animated.spring(animatedValue, {
        toValue: -180, // Flipping to back, i changed here from 180 to -180
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsFlipped(true);
    }
  };

  interface Card {
    id: string;
    answer: string;
    answer_status_id: string;
    card_id: string;
    category_id: string;
    keywords: string;
    question: string;
    userID: string
  }

  const { user, fetchCategoryCards } = useFirebase();

  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetchCategoryCards(id, user);
      const cardData = response.map((card: Card) => ({
        question: card.question,
        answer: card.answer,
        answer_status_id: card.answer_status_id,
        card_id: card.card_id,
        category_id: card.category_id,
        keywords: card.keywords,
        userID: card.userID
      }));
      setData(cardData);
    } catch (error) {
      Alert.alert("Failed", "Failed fetching card data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);


  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='h-full mx-[40px]'>
        <View className='items-center justify-center mt-[100px]'>
          <Text className='text-textColor font-semibold text-xl'>{category_name}</Text>
        </View>
        {
          !loading ? (
            <View className='h-[550px] justify-center'>
              {/* <View className='h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px]'>
            <Text className='text-textColor font-bold text-3xl'>Tomodachi</Text>
          </View> */}

              {data.map((item, index) => (
                <View key={index}>
                  <TouchableWithoutFeedback onPress={flipCard}>
                    <View>
                      {/* Front Card */}
                      <Animated.View
                        className="h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px] p-5"
                        style={[{ backfaceVisibility: 'hidden' }, { transform: [{ rotateY: frontInterpolate }] }]}>
                        <Text className='text-textColor text-center font-bold text-3xl'>{item.question}</Text>
                      </Animated.View>
                      {/* Back Card */}
                      <Animated.View
                        className="absolute h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px] p-5"
                        style={[
                          { backfaceVisibility: 'hidden' },
                          { transform: [{ rotateY: backInterpolate }] },
                        ]}
                      >
                        <Text className='text-textColor text-center font-medium text-xl'>{item.answer}</Text>
                      </Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))}
              
              <View className='flex flex-row w-[330px] h-[50px] items-center justify-evenly bg-cardBg rounded-[10px] border border-secondary mb-[10px]'>
                <TouchableOpacity className='w-[75px] h-[26px] bg-redBg rounded-[10px] items-center justify-center' activeOpacity={0.7}>
                  <Text className='text-textColor font-medium text-xs'>Bad</Text>
                </TouchableOpacity>
                <TouchableOpacity className='w-[75px] h-[26px] bg-yellowBg rounded-[10px] items-center justify-center' activeOpacity={0.7}>
                  <Text className='text-textColor font-medium text-xs'>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity className='w-[75px] h-[26px] bg-greenBg rounded-[10px] items-center justify-center' activeOpacity={0.7}>
                  <Text className='text-textColor font-medium text-xs'>Good</Text>
                </TouchableOpacity>
              </View>
              <View className='flex flex-row justify-between'>
                <TouchableOpacity className='w-[100px] h-[35px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center' activeOpacity={0.7}>
                  <Image
                    className='w-6 h-6 rotate-180'
                    source={icons.arrow}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <TouchableOpacity className='w-[100px] h-[35px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center' activeOpacity={0.7}>
                  <Image
                    className='w-6 h-6'
                    source={icons.arrow}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className='h-[700px]'>
              <View className="flex-1 justify-center items-center bg-primary">
                <ActivityIndicator size="large" color="#124D87" className="mb-4" />
              </View>
            </View>
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default Flashcard