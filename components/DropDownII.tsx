import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { styled } from 'nativewind';
import { useFirebase } from '@/context/firebase';



interface DropDownProps {
    handleChange: (text: string) => void;
}

interface Category {
    category_id: string;
    categoryName: string;
    categoryImage: string;
}

const DropDownII: React.FC<DropDownProps> = ({ handleChange }) => {
    const [value, setValue] = useState<string>('');
    const [isFocus, setIsFocus] = useState<boolean>(false);


    interface DropdownItem {
        label: string;
        value: string;
    }

    const data: DropdownItem[] = [
        { label: 'Good', value: 'good' },
        { label: 'Ok', value: 'ok' },
        { label: 'Bad', value: 'bad' }
    ];

    return (
        <View className="bg-cardBg rounded-[10px] ">
            <Dropdown
                style={[
                    { height: 48, borderColor: isFocus ? '#3086DB' : '#124D87', borderWidth: 1, borderRadius: 10, paddingHorizontal: 8 }
                ]}
                containerStyle={{ backgroundColor: 'rgba(0, 31, 63, 1)', borderColor: '#3086DB', borderRadius: 10 }}
                itemTextStyle={{ color: '#3086DB' }}

                placeholderStyle={{ fontSize: 14, color: '#124D87' }}
                selectedTextStyle={{ fontSize: 14, color: '#F4F0F0' }}
                inputSearchStyle={{ fontSize: 14, height: 40, color: '#F4F0F0', borderColor: '#3086DB', borderRadius: 10 }}
                iconStyle={{ width: 20, height: 20 }}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select status' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: DropdownItem) => {
                    setValue(item.value);
                    setIsFocus(false);
                    if (handleChange) {
                        handleChange(item.label);
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

export default DropDownII;
