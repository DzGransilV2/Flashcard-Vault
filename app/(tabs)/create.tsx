import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import DropDown from '@/components/DropDown'
import RadioButtonGroup from '@/components/RadioButton'
import ImagePickerCard from '@/components/ImagePicker'

const Create = () => {

  const [showCategory, setShowCategory] = useState<string>('');

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='h-full mx-[40px] gap-y-[5px]'>
        <View>
          <Text className='text-textColor mt-[30px] text-xl font-semibold'>Create Card</Text>
        </View>
        <View className='gap-y-5'>
          <View>
            <FormField
              fieldHeading="Question"
              placeholder="Type question here...."
            />
          </View>
          <View>
            <FormField
              fieldHeading="Answer"
              placeholder="Type answer here...."
            />
          </View>
          <View>
            <FormField
              fieldHeading="Main Keywords"
              placeholder="Example: kono, sono etc"
            />
          </View>
          <View>
            <View className='mb-[10px]'>
              <RadioButtonGroup setShowCategory={setShowCategory} />
            </View>
            {showCategory === '' ? null
              :
              showCategory === 'exist' ? (
                <DropDown />
              ) : (
                <View className='gap-y-[10px]'>
                  <View>
                    <FormField
                      fieldHeading="Category name"
                      placeholder="Type category name here.."
                    />
                  </View>
                  <View>
                    <Text className='text-textColor font-medium text-base mb-[10px]'>Category image</Text>
                    <ImagePickerCard />
                  </View>
                </View>
              )}
          </View>
          <View>
            <TouchableOpacity className='items-center justify-center' activeOpacity={0.7}>
              <View className='bg-cardBg h-[50px] w-[130px] items-center justify-center border border-secondary rounded-[10px]'>
                <Text className='text-secondary text-xl font-semibold'>Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create