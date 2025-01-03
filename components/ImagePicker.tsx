import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';


interface ImageProps {
  setImageVerify: (text: string) => void;
}

const ImagePickerCard = ({ setImageVerify }: ImageProps) => {

  const [image, setImage] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageVerify(result.assets[0].uri);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={pickImage}
        className='bg-cardBg border border-secondary w-full max-w-[330px] rounded-lg px-4 py-2 mt-[10px] mb-[10px] items-center justify-center'
      >
        <Text className='text-secondary text-sm font-medium'>Tap here to choose Image</Text>
      </TouchableOpacity>
      {image &&
        <>
          <Text className='text-textColor font-medium text-base w-[320px] mb-[10px]'>Preview</Text>
          <Image
            source={{ uri: image }}
            className='h-[100px] w-[100px] rounded-[10px]'
            resizeMode='cover'
          />
        </>
      }
    </>
  )
}

export default ImagePickerCard