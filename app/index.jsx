import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants";
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
    const { isLoading, isLogged } = useGlobalContext();

    if (!isLoading && isLogged) {
        return (
            <Redirect href="/home" />
        )
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full min-h-[85vh] flex-grow justify-center items-center px-4">
                    <Image
                        source={images.logo}
                        className="w-[120px] h-[84px]"
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />

                    <View className="relative mt-5">
                        <Text className="text-2xl text-white text-bold text-center">
                            Откройте Безграничныe Возможности вместе с {' '}
                            <Text className="text-secondary-200 ">Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[12px] absolute -bottom-1 -right-9"
                            resizeMode='contain'
                        />
                    </View>

                    <Text className="text-sm text-pregular text-gray-100 mt-7 text-center opacity-70">
                        Там где творчество встречается с инновациями: Отправляйтесь в путешествие по безграничным просторам вместе с Aora
                    </Text>

                    <CustomButton
                        title="Продолжить c Почтой"
                        handlePress={() => router.push("/sign-in")}
                        containerStyles="w-full mt-7 mb-5"
                    />
                </View>
            </ScrollView>

            <StatusBar
                backgroundColor='#161622'
                style={'light'}
            />
        </SafeAreaView>
    );
}