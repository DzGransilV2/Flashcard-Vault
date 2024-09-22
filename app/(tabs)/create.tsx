import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchComponent from '@/components/SearchComponent'
import FormField from '@/components/FormField'
import DropDown from '@/components/DropDown'
import RadioButtonGroup from '@/components/RadioButton'
import ImagePickerCard from '@/components/ImagePicker'

const Create = () => {

  const [showCategory, setShowCategory] = useState<string>('');

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='h-full mx-[40px] gap-y-[50px]'>
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
                <View className='gap-y-5'>
                  <View>
                    <FormField
                      fieldHeading="Category name"
                      placeholder="Type category name here.."
                    />
                  </View>
                  <View>
                    <ImagePickerCard />
                  </View>
                </View>
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create