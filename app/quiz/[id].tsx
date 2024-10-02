import { View, Text, Dimensions, ScrollView, RefreshControl, Alert, TouchableWithoutFeedback, Animated, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useFirebase } from '@/context/firebase';
import { icons } from '@/constants';
import FormField from '@/components/FormField';
import CustomBtn from '@/components/CustomBtn';

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

const QuizScreen = () => {

    const { id, category_name } = useLocalSearchParams();


    const { user, fetchCategoryCards, updateAnswerStatus } = useFirebase();

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [data, setData] = useState<Card[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const [answer, setAnswer] = useState("");

    const [correct, setCorrect] = useState<boolean | null>(null);
    const [isChecked, setIsChecked] = useState(false);

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

    const handleAnswer = (e: string) => {
        setAnswer(e)
    }

    const checkAnswer = async () => {
        setLoading2(true)
        try {
            const keywords = currentCard.keywords.split(',').map(kw => kw.trim().toLocaleLowerCase());
            const normalizedAnswer = answer.toLocaleLowerCase();
            const normalizedCardAnswer = currentCard.answer.toLocaleLowerCase();

            if (normalizedAnswer === normalizedCardAnswer || keywords.includes(normalizedAnswer)) {
                setCorrect(true)
                await updateAnswerStatus(user, currentCard.card_id, true);
                console.log("Correct Answer");
            } else {
                setCorrect(false)
                await updateAnswerStatus(user, currentCard.card_id, false);
                console.log("Incorrect Answer");
            }
            setIsChecked(true)
        } catch (error) {
            console.log("ERROR in CHECKING ANSWER", error)
        } finally {
            setLoading2(false)
        }
    };

    const handleNext = () => {
        if (currentCardIndex < data.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setCorrect(null)
            setIsChecked(false)
            setAnswer("")
        }
    };

    const currentCard = data[currentCardIndex];

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const { width: initialWidth, height: initialHeight } = Dimensions.get('window');

    const [windowDimensions, setWindowDimensions] = useState({
        width: initialWidth,
        height: initialHeight,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setWindowDimensions({
                width: window.width,
                height: window.height,
            });
        });
        return () => {
            subscription?.remove();
        };
    }, []);

    const { width, height } = windowDimensions;

    const cardHeight = height > 800 ? 'h-[330]' : 'h-[250]';
    const cardWidth = width > 400 ? 'w-[330]' : 'w-[250]';
    const marginTop = height > 800 ? 'mt-[100]' : 'mt-[50]';
    const heightBase = height > 800 ? 'h-[550px]' : 'h-[500px]'

    const btnW = width > 400 ? 'w-[100]' : 'w-[90]';
    const btnH = height > 800 ? 'h-[45]' : 'h-[35]';

    const arrowW = width > 400 ? 'w-[100]' : 'w-[75]';
    const arrowH = height > 800 ? 'h-[35]' : 'h-[25]';

    return (
        <SafeAreaView className='h-full bg-primary'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className='h-full mx-[40px]'
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View className={`items-center justify-center ${marginTop}`}>
                    <Text className='text-textColor font-semibold text-xl'>{category_name} Quiz</Text>
                </View>
                {
                    !loading ? (
                        <View className={`${heightBase} items-center justify-center`}>
                            {currentCard && (
                                <View >
                                    <TouchableWithoutFeedback onPress={flipCard}>
                                        <View>
                                            {/* Front Card */}
                                            <Animated.View
                                                className={`${cardHeight} ${cardWidth} bg-cardBg border ${correct === true ? 'border-greenBrightBg' : correct === false ? 'border-redBrightBg' : 'border-secondary'} rounded-[10px] items-center justify-center mb-[10px] p-5`}
                                                style={[{ backfaceVisibility: 'hidden' }, { transform: [{ rotateY: frontInterpolate }] }]}>
                                                <Text className='text-textColor text-center font-bold text-3xl'>{currentCard.question}</Text>
                                            </Animated.View>
                                            {/* Back Card */}
                                            <Animated.View
                                                className={`absolute ${cardHeight} ${cardWidth} bg-cardBg border ${correct === true ? 'border-greenBrightBg' : correct === false ? 'border-redBrightBg' : 'border-secondary'} rounded-[10px] items-center justify-center mb-[10px] p-5`}
                                                style={[
                                                    { backfaceVisibility: 'hidden' },
                                                    { transform: [{ rotateY: backInterpolate }] },
                                                ]}
                                            >
                                                {correct === true ? (
                                                    <>
                                                        {answer.toLocaleLowerCase() === currentCard.answer.toLocaleLowerCase() ? (
                                                            <Text className='text-greenBrightBg text-center font-bold text-xl break-words'>
                                                                🎉 Great job! Your answer "{answer}" is correct.
                                                            </Text>
                                                        ) : (
                                                            <Text className='text-yellowBrightBg text-center font-bold text-xl break-words'>
                                                                👍 Your answer "{answer}" is close enough and related to the correct answer "{currentCard.answer}".
                                                            </Text>
                                                        )}
                                                    </>
                                                ) : correct === false ? (
                                                    <Text className='text-redBrightBg text-center font-bold text-xl break-words'>
                                                        ❌ Oops! Your answer "{answer}" is incorrect. The correct answer is "{currentCard.answer}".
                                                    </Text>
                                                ) : (
                                                    <FormField
                                                        placeholder='Type your answer'
                                                        style='text-center'
                                                        containerStyle='border-0 -mt-[10px]'
                                                        handleChange={(e) => handleAnswer(e)}
                                                        value={answer}
                                                    />
                                                )}

                                            </Animated.View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}
                            <View className='items-center justify-center'>
                                {!isChecked ? (
                                    <CustomBtn
                                        title='Check'
                                        containerStyle={`${btnH} ${btnW} px-5`}
                                        textStyles='text-base'
                                        handlePress={checkAnswer}
                                        isLoading={!isFlipped}
                                    />
                                ) : (
                                    <TouchableOpacity
                                        onPress={handleNext}
                                        disabled={currentCardIndex === data.length - 1}
                                        className={`${arrowW} ${arrowH} bg-cardBg ${currentCardIndex === data.length - 1 ? '' : 'border border-secondary'} rounded-[10px] items-center justify-center`}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            className='w-6 h-6'
                                            source={icons.arrow}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                )}
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default QuizScreen