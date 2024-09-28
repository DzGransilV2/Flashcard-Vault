import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Animated, StyleSheet, Alert, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';
import { useFirebase } from '@/context/firebase';

const Flashcard = () => {

  const { id, category_name } = useLocalSearchParams();

  // console.log(id)

  const { user, fetchCategoryCards, updateCardStatus } = useFirebase();

  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [cardStatus, setCardStatus] = useState("");

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

  useEffect(() => {
    // Reset flip state and animated value
    setIsFlipped(false);
    animatedValue.setValue(0);

  }, [currentCardIndex]);

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

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetchCategoryCards(id, user);
      const cardData = response.map((card: Card) => ({
        question: card.question,
        answer: card.answer,
        card_status: card.card_status,
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


  const handleNext = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };


  const currentCard = data[currentCardIndex];

  const updateStatus = async (card_id: string, card_status: string) => {
    if (card_id && card_status) {
      const response = await updateCardStatus({ card_id, card_status });
      Alert.alert("Card Status", response);
    } else {
      console.error("Card ID or Status is missing Client");
    }
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        className='h-full mx-[40px]'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <View className='h-full mx-[40px]'> */}
        <View className='items-center justify-center mt-[100px]'>
          <Text className='text-textColor font-semibold text-xl'>{category_name}</Text>
        </View>
        {
          !loading ? (
            <View className='h-[550px] justify-center'>
              {currentCard && (
                <View >
                  <TouchableWithoutFeedback onPress={flipCard}>
                    <View>
                      {/* Front Card */}
                      <Animated.View
                        className="h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px] p-5"
                        style={[{ backfaceVisibility: 'hidden' }, { transform: [{ rotateY: frontInterpolate }] }]}>
                        <Text className='text-textColor text-center font-bold text-3xl'>{currentCard.question}</Text>
                      </Animated.View>
                      {/* Back Card */}
                      <Animated.View
                        className="absolute h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px] p-5"
                        style={[
                          { backfaceVisibility: 'hidden' },
                          { transform: [{ rotateY: backInterpolate }] },
                        ]}
                      >
                        <Text className='text-textColor text-center font-medium text-xl break-words'>{currentCard.answer}</Text>
                      </Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
              <View className='flex flex-row w-[330px] h-[50px] items-center justify-evenly bg-cardBg rounded-[10px] border border-secondary mb-[10px]'>
                <TouchableOpacity
                  onPress={() => updateStatus(currentCard.card_id, 'bad')}
                  className={`w-[75px] h-[26px] ${currentCard.card_status === 'bad' ? 'bg-redBrightBg' : 'bg-redBg'}  rounded-[10px] items-center justify-center`}
                  activeOpacity={0.7}>
                  <Text className='text-textColor font-medium text-xs'>Bad</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => updateStatus(currentCard.card_id, 'ok')}
                  className={`w-[75px] h-[26px] ${currentCard.card_status === 'ok' ? 'bg-yellowBrightBg' : 'bg-yellowBg'}  rounded-[10px] items-center justify-center`}
                  activeOpacity={0.7}>
                  <Text className='text-textColor font-medium text-xs'>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => updateStatus(currentCard.card_id, 'good')}
                  className={`w-[75px] h-[26px] ${currentCard.card_status === 'good' ? 'bg-greenBrightBg' : 'bg-greenBg'}  rounded-[10px] items-center justify-center`}
                  activeOpacity={0.7}>
                  <Text className='text-textColor font-medium text-xs'>Good</Text>
                </TouchableOpacity>
              </View>
              <View className='flex flex-row justify-between'>
                {/* Back arrow button */}
                <TouchableOpacity
                  onPress={handleBack}
                  disabled={currentCardIndex === 0}
                  className={`w-[100px] h-[35px] bg-cardBg ${currentCardIndex === 0 ? '' : 'border border-secondary'} rounded-[10px] items-center justify-center`} activeOpacity={0.7}>
                  <Image
                    className='w-6 h-6 rotate-180'
                    source={icons.arrow}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                {/* Next arrow button */}
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={currentCardIndex === data.length - 1}
                  className={`w-[100px] h-[35px] bg-cardBg ${currentCardIndex === data.length - 1 ? '' : 'border border-secondary'} rounded-[10px] items-center justify-center`} activeOpacity={0.7}>
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
        {/* </View> */}
      </ScrollView>
    </SafeAreaView >
  )
}

export default Flashcard