import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { styled } from 'nativewind';

// Define types for dropdown items
interface DropdownItem {
  label: string;
  value: string;
}

const data: DropdownItem[] = [
  { label: 'Japanese', value: '1' },
  { label: 'Math', value: '2' },
];

const DropDown: React.FC = () => {
  const [value, setValue] = useState<string | null>(null); // Value can be null or string
  const [isFocus, setIsFocus] = useState<boolean>(false);  // Track focus state


  return (
    <View className="bg-cardBg rounded-[10px] ">
      {/* {renderLabel()} */}
      <Dropdown
        style={[
          { height: 48, borderColor: isFocus ? '#3086DB' : '#124D87', borderWidth: 1, borderRadius: 10, paddingHorizontal: 8 }
        ]}
        containerStyle={{ backgroundColor: 'rgba(0, 31, 63, 0.5)', borderColor: '#3086DB', borderRadius: 10 }}
        itemTextStyle={{color:'#3086DB'}}

        placeholderStyle={{ fontSize: 16, color: '#124D87' }}
        selectedTextStyle={{ fontSize: 16, color: '#F4F0F0' }}
        inputSearchStyle={{ fontSize: 16, height: 40, color: '#F4F0F0' }}
        iconStyle={{ width: 20, height: 20 }}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select categoty' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: DropdownItem) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={{ marginLeft:20,  marginRight: 10 }}
            color={isFocus ? '#3086DB' : '#124D87'}
            name="folder1"
            size={20}
          />
        )}
        renderRightIcon={()=>(
          <AntDesign
          style={{ marginRight: 20 }}
            color={isFocus ? '#3086DB' : '#124D87'}
            name="down"
            size={15}
          />
        )}
      />
    </View>
  );
};

export default DropDown;
