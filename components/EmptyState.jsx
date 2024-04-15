import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="px-4 justify-center items-center">
            <Image
                source={images.empty}
                className="w-[217px] h-[215px]"
                resizeMode={"contain"}
            />
            <Text className="text-xl font-psemibold text-white text-center mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>

            <CustomButton
                title="Создать видео"
                handlePress={() => router.push("/create")}
                containerStyles="w-full my-5"
            />
        </View>
    )
}

export default EmptyState