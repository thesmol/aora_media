import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { icons } from "../constants";

const SearchInput = ({
    title,
    value,
    handleChangeText,
    placeholder = "Искать видео топик",
    type,
    ...props
}) => {

    return (
        <View className="w-full h-14 flex-row px-4 bg-black border-2 border-black-200 rounded-2xl focus:border-secondary items-center space-x-4">
            <TextInput
                className="flex-1 text-white font-pregular text-base mt-0.5 items-center"
                placeholder={placeholder}
                value={value}
                placeholderTextColor="#7b7b8b"
                onChange={handleChangeText}
                {...props}
                style = {{
                    alignItems: 'center'
                }}
            />

            <TouchableOpacity>
                <Image
                    className="h-6 w-6"
                    resizeMode={'contain'}
                    source={icons.search}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput