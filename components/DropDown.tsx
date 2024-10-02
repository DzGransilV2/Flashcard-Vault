import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { styled } from 'nativewind';
import { useFirebase } from '@/context/firebase';



interface DropDownProps {
  handleChange: (text: string) => void;
  exitsImage: (text: string) => void;
  category_id_exists: (text: string) => void;
  oldCategoryLabel?: string;
  oldCategoryValue?: string;
}

interface Category {
  category_id: string;
  categoryName: string;
  categoryImage: string;
}

const DropDown: React.FC<DropDownProps> = ({ oldCategoryLabel, oldCategoryValue, handleChange, exitsImage, category_id_exists }) => {
  const [value, setValue] = useState<string>(''); // Value can be null or string
  const [isFocus, setIsFocus] = useState<boolean>(false);  // Track focus state

  const { fetchCategoriesByUserId, user } = useFirebase();
  const [data, setData] = useState<DropdownItem[]>([]);

  // console.log("Label and Value:", oldCategoryLabel, oldCategoryValue)

  const fetchCategories = async () => {
    if (user) {
      const categories = await fetchCategoriesByUserId(user);
      const dropdownData = categories.map((category: Category) => ({
        label: category.categoryName,
        value: [category.category_id, category.categoryImage]
      }));
      setData(dropdownData);
      data.forEach(element => {
        if (element.label === oldCategoryLabel && element.value === oldCategoryValue) {
          setValue(element.value)
        }
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    // console.log("Current Value", value)
  }, [user]);


  interface DropdownItem {
    label: string;
    value: string;
  }

  // const data: DropdownItem[] = [
  //   { label: 'Japanese', value: '1' },
  //   { label: 'Math', value: '2' },
  // ];

  return (
    <View className="bg-cardBg rounded-[10px]  mt-[10px] mb-[10px] ">
      {/* {renderLabel()} */}
      <Dropdown
        style={[
          { height: 48, borderColor: isFocus ? '#3086DB' : '#124D87', borderWidth: 1, borderRadius: 10, paddingHorizontal: 8 }
        ]}
        containerStyle={{ backgroundColor: 'rgba(0, 31, 63, 1)', borderColor: '#3086DB', borderRadius: 10 }}
        itemTextStyle={{ color: '#3086DB' }}
        // accessibilityLabel={oldCategoryLabel}
        placeholderStyle={{ fontSize: 14, color: '#124D87' }}
        selectedTextStyle={{ fontSize: 14, color: '#F4F0F0' }}
        inputSearchStyle={{ fontSize: 14, height: 40, color: '#F4F0F0', borderColor: '#3086DB', borderRadius: 10 }}
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
          if (handleChange) {
            handleChange(item.label);
          }
          if (exitsImage) {
            exitsImage(item.value[1]);
          }
          if (category_id_exists) {
            category_id_exists(item.value[0]);
          }
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={{ marginLeft: 20, marginRight: 10 }}
            color={isFocus ? '#3086DB' : '#124D87'}
            name="folder1"
            size={20}
          />
        )}
        renderRightIcon={() => (
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
