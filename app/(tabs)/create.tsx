import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import DropDown from '@/components/DropDown'
import RadioButtonGroup from '@/components/RadioButton'
import ImagePickerCard from '@/components/ImagePicker'

const Create = () => {

  const [showCategory, setShowCategory] = useState<string>('');
  const [form, setForm] = useState({
    question: '',
    answer: '',
    keywords: '',
    category: ''
  })
  const [imageVerify, setImageVerify] = useState<string>('');

  useEffect(() => {
    console.log("Form", form);
  })


  const handleQuestionChange = (text: string) => {
    setForm({ ...form, question: text });
  };

  const handleAnswerChange = (text: string) => {
    setForm({ ...form, answer: text });
  };

  const handleKeywordsChange = (text: string) => {
    setForm({ ...form, keywords: text });
  };

  const handleCategoryChange = (text: string) => {
    setForm({ ...form, category: text });
  };

  const verifyImage = (text: string) => {
    setImageVerify(text);
  };


  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='h-full mx-[40px] gap-y-[5px]'>
        <View>
          <Text className='text-textColor mt-[30px] text-xl font-semibold'>Create Card</Text>
        </View>
        <View className='gap-y-5 h-[696px]'>
          {/* This scroll view extra to escape from tab lol */}
          <ScrollView className='gap-y-5'>
            <View>
              <FormField
                fieldHeading="Question"
                placeholder="Type question here...."
                handleChange={handleQuestionChange}
              />
            </View>
            <View>
              <FormField
                fieldHeading="Answer"
                placeholder="Type answer here...."
                handleChange={handleAnswerChange}
              />
            </View>
            <View>
              <FormField
                fieldHeading="Main Keywords"
                placeholder="Example: kono, sono etc"
                handleChange={handleKeywordsChange}
              />
            </View>
            <View>
              <View className='mb-[10px]'>
                <RadioButtonGroup setShowCategory={setShowCategory} />
              </View>
              {showCategory === '' ? null
                :
                showCategory === 'exist' ? (
                  <DropDown
                    handleChange={handleCategoryChange}
                  />
                ) : (
                  <View className='gap-y-[10px]'>
                    <View>
                      <FormField
                        fieldHeading="Category name"
                        placeholder="Type category name here.."
                        handleChange={handleCategoryChange}
                      />
                    </View>
                    <View>
                      <Text className='text-textColor font-medium text-base mb-[10px]'>Category image</Text>
                      <ImagePickerCard setImageVerify={verifyImage} />
                    </View>
                  </View>
                )}
            </View>
            {
              form.category != '' && imageVerify != '' && (
                <View>
                  <TouchableOpacity className='items-center justify-center' activeOpacity={0.7}>
                    <View className='bg-cardBg h-[50px] w-[130px] items-center justify-center border border-secondary rounded-[10px]'>
                      <Text className='text-secondary text-xl font-semibold'>Create</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create