import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";
import { router, usePathname } from 'expo-router';

const SearchInput = ({ initialQuery }) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="w-full h-14 flex-row px-4 bg-black border-2 border-black-200 rounded-2xl focus:border-secondary items-center space-x-4">
            <TextInput
                className="flex-1 text-white font-pregular text-base mt-0.5 items-center"
                placeholder={"Искать..."}
                value={query}
                placeholderTextColor="#cdcde0"
                onChangeText={(e) => setQuery(e)}
                style={{
                    alignItems: 'center'
                }}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert("Отсутсвует запрос", "Пожалуйста введите ваш запрос для поиска")
                    }

                    if (pathName.startsWith('/search')) {
                        router.setParams({ query });
                    } else {
                        router.push(`/search/${query}`);
                    }
                }}
            >
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