import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';

const Flashcard = () => {

  const pathname = useLocalSearchParams();

  // console.log(pathname.id)

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


  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='h-full mx-[40px]'>
        <View className='items-center justify-center mt-[100px]'>
          <Text className='text-textColor font-semibold text-xl'>Japanese</Text>
        </View>
        <View className='h-[550px] justify-center'>
          {/* <View className='h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px]'>
            <Text className='text-textColor font-bold text-3xl'>Tomodachi</Text>
          </View> */}

          <View>
            <TouchableWithoutFeedback onPress={flipCard}>
              <View>
                {/* Front Card */}
                <Animated.View 
                className="h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px]"
                style={[{backfaceVisibility:'hidden'}, { transform: [{ rotateY: frontInterpolate }] }]}>
                  <Text className='text-textColor font-bold text-3xl'>Front Side</Text>
                </Animated.View>
                {/* Back Card */}
                <Animated.View
                className="absolute h-[330px] w-[330px] bg-cardBg border border-secondary rounded-[10px] items-center justify-center mb-[10px]"
                  style={[
                    {backfaceVisibility:'hidden'},
                    { transform: [{ rotateY: backInterpolate }] },
                  ]}
                >
                  <Text className='text-textColor font-bold text-3xl'>Back Side</Text>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </View>

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
      </View>
    </SafeAreaView>
  )
}

export default Flashcard