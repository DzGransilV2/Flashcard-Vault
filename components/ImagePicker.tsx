import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const ImagePickerCard = () => {

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className='items-center justify-center gap-3'>
      <TouchableOpacity
        onPress={pickImage}
        className='bg-cardBg border border-secondary rounded-lg px-4 py-2 mt-4 mb-[10px] items-center justify-center'
      >
        <Text className='text-secondary text-sm font-medium'>Choose Image for Category</Text>
      </TouchableOpacity>
      {image &&
        <>
          <Text className='text-textColor font-medium text-base w-[320px]'>Preview</Text>
          <Image
            source={{ uri: image }}
            className='h-[100px] w-[100px]'
            resizeMode='cover'
          />
        </>
      }
    </View>
  )
}

export default ImagePickerCard