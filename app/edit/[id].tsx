import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import RadioButtonGroup from "@/components/RadioButton";
import DropDown from "@/components/DropDown";
import ImagePickerCard from "@/components/ImagePicker";
import CustomBtn from "@/components/CustomBtn";
import { useFirebase } from "@/context/firebase";
import DropDownII from "@/components/DropDownII";

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

interface Category {
    id: string;
    categoryName: string;
    categoryImage: string;
    card_id: string[];
    userId: string;
}

const Update = () => {
    const { id } = useLocalSearchParams();
    const cardId = Array.isArray(id) ? id[0] : id;

    const { updateCard, user, fetchAllCards, fetchCategoriesByUserId } =
        useFirebase();

    const [data, setData] = useState<Card | null>(null);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    const [showCategory, setShowCategory] = useState<string>("");
    const [form, setForm] = useState({
        question: "",
        answer: "",
        keywords: "",
        card_status: "",
        category_id_exists: "",
        category_id_exists_previous: "",
        category: "",
        categoryImage: "",
        categoryImageExists: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const responseOfCard = await fetchAllCards(user);
            const foundCard = responseOfCard.find((element: Card) => element.id === cardId);
            setData(foundCard || null);

            const responseOfCategory = await fetchCategoriesByUserId(user);
            const foundCategory = responseOfCategory.find((element: Category) => element.card_id.includes(cardId));
            setCategory(foundCategory || null);

            if (foundCard) {
                // Initialize form with card data
                setForm({
                    question: foundCard.question,
                    answer: foundCard.answer,
                    keywords: foundCard.keywords,
                    card_status: foundCard.card_status,
                    category_id_exists: foundCard?.category_id || "",
                    category_id_exists_previous: foundCard?.category_id || "",
                    category: foundCategory?.categoryName || "",
                    categoryImage: "",
                    categoryImageExists: foundCategory?.categoryImage || "",
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setShowCategory("exist");
    }, [user, id]);

    useEffect(() => {
        console.log("Updated form:", form);
    }, [form]);

    const handleQuestionChange = (text: string) => {
        setForm({ ...form, question: text });
    };

    const handleAnswerChange = (text: string) => {
        setForm({ ...form, answer: text });
    };

    const handleKeywordsChange = (text: string) => {
        setForm({ ...form, keywords: text });
    };

    const handleStatusChange = (text: string) => {
        setForm({ ...form, card_status: text });
    };

    const handleCategoryChange = useCallback((text: string) => {
        setForm((prevForm) => ({ ...prevForm, category: text }));
    }, []);

    const verifyImage = (text: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            categoryImage: text,
            categoryImageExists: ""
        }));
    };

    const exitsImage = (text: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            categoryImageExists: text,
            categoryImage: "",
        }));
    };

    const handleCategoryIDChange = (text: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            category_id_exists: text,
        }));
    };

    const submit = async () => {
        if (!form.answer || !form.question || !form.keywords || !form.category) {
            Alert.alert("Error", "Please fill in all the fields");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await updateCard({ form }, cardId)
            router.replace("/(tabs)/edit");
            Alert.alert(
                "Success",
                response
            );
            setForm({
                question: "",
                answer: "",
                keywords: "",
                card_status: "",
                category_id_exists: "",
                category_id_exists_previous: "",
                category: "",
                categoryImage: "",
                categoryImageExists: "",
            });
        } catch (error) {
            Alert.alert("Error", "Got error in signIn but client side");
            console.log("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView className="h-full mx-[40px] gap-y-[5px]" showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="text-textColor mt-[30px] text-xl font-semibold">
                        Edit Card
                    </Text>
                </View>
                <View className="h-full gap-y-5">
                    {!loading ? (
                        <>
                            <View className="gap-y-5">
                                <View>
                                    <FormField
                                        fieldHeading="Question"
                                        placeholder="Type question here...."
                                        handleChange={handleQuestionChange}
                                        value={form.question}
                                    />
                                </View>
                                <View>
                                    <FormField
                                        fieldHeading="Answer"
                                        placeholder="Type answer here...."
                                        handleChange={handleAnswerChange}
                                        value={form.answer} // Controlled by form state
                                    />
                                </View>
                                <View>
                                    <FormField
                                        fieldHeading="Main Keywords"
                                        placeholder="Example: kono, sono etc"
                                        handleChange={handleKeywordsChange}
                                        value={form.keywords} // Controlled by form state
                                    />
                                </View>
                                <View>
                                    {/* <FormField
                                        fieldHeading="Status"
                                        placeholder="good, ok & bad"
                                        value={form.card_status}
                                        handleChange={handleStatusChange}
                                    /> */}
                                    <Text className="text-textColor font-medium text-base mb-[10px]">Card Status</Text>
                                    <DropDownII
                                        handleChange={handleStatusChange}
                                    />
                                </View>
                                <View>
                                    <RadioButtonGroup
                                        oldCategory={showCategory}
                                        setShowCategory={setShowCategory}
                                    />
                                    {showCategory === "exist" ? (
                                        <DropDown
                                            handleChange={handleCategoryChange}
                                            exitsImage={exitsImage}
                                            category_id_exists={handleCategoryIDChange}
                                            oldCategoryLabel={category?.categoryName}
                                            oldCategoryValue={category?.categoryImage}
                                        />
                                    ) : (
                                        <View className="gap-y-[10px] mt-[10px]">
                                            <FormField
                                                fieldHeading="Category name"
                                                placeholder="Type category name here.."
                                                handleChange={handleCategoryChange}
                                                value={form.category}
                                            />
                                            <Text className="text-textColor font-medium text-base mb-[10px]">
                                                Category image
                                            </Text>
                                            <ImagePickerCard setImageVerify={verifyImage} />
                                        </View>
                                    )}
                                </View>
                                {form.category &&
                                    (form.categoryImage || form.categoryImageExists) && (
                                        <View className="items-center justify-center">
                                            <CustomBtn
                                                title="Update"
                                                handlePress={submit}
                                                containerStyle="w-[130px] h-[50px] mb-5"
                                                textStyles="text-xl"
                                                isLoading={isSubmitting}
                                            />
                                        </View>
                                    )}
                            </View>
                        </>
                    ) : (
                        <View className="h-[700px]">
                            <View className="flex-1 justify-center items-center bg-primary">
                                <ActivityIndicator size="large" color="#124D87" />
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Update;
