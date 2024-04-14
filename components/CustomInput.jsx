import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";

const CustomInput = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder,
    type,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View className="w-full h-14 flex-row px-4 bg-black border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
                <TextInput
                    className="flex-1 text-white p-semibold text-base w-full"
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor="#7b7b8b"
                    onChange={handleChangeText}
                    secureTextEntry={type === "password" && !showPassword}
                    keyboardType={keyboardType}
                    {...props}
                />
                {type === "password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            className="h-6 w-6 ml-2"
                            resizeMode={'contain'}
                            source={!showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default CustomInput
