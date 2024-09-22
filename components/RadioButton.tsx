import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity className='flex flex-row items-center mb-[10px]' onPress={onPress}>
      <View className='h-5 w-5 rounded-[10px] border-2 border-secondary items-center justify-center mr-[10px]'>
        {selected && <View className='h-3 w-3 rounded-md bg-secondary' />}
      </View>
      <Text className='text-base text-textColor font-normal'>{label}</Text>
    </TouchableOpacity>
  );
};

interface Props{
    setShowCategory: React.Dispatch<React.SetStateAction<string>>;
}

const RadioButtonGroup: React.FC<Props> = ({setShowCategory}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const radioOptions = [
    { label: 'Create new category', value: 'create' },
    { label: 'Use existing category', value: 'exist' }
  ];

  return (
    <View>
      <Text className='text-textColor font-medium text-base mb-[10px]'>Category</Text>
      {radioOptions.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={() => {setSelectedValue(option.value); setShowCategory(option.value)}}
        />
      ))}
    </View>
  );
};

export default RadioButtonGroup;
