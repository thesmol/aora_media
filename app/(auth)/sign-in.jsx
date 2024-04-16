import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { images } from "../../constants";
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCurrentUser, signIn } from '../../lib/appwrite';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);
    const { setUser, setIsLogged } = useGlobalContext();

    const submit = async () => {
        if (form.email === "" || form.password === ""
        ) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
        }

        setLoading(true);

        try {
            await signIn(
                form.email,
                form.password,
            );
            const result = await getCurrentUser();
            setUser(result);
            setIsLogged(true);
            
            router.replace('/home');
        } catch (error) {
            Alert.alert('Ошибка', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] justify-center px-4 my-6">
                    <Image
                        source={images.logo}
                        resizeMode={'contain'}
                        className="w-[115px] h-[35px]"
                    />
                    <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
                        Вход в Aora
                    </Text>

                    <CustomInput
                        title="Почта"
                        value={form.email}
                        handleChangeText={(event) => setForm(
                            { ...form, email: event, }
                        )}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        placeholder="Введите почту"
                    />

                    <CustomInput
                        title="Пароль"
                        value={form.password}
                        handleChangeText={(event) => setForm(
                            { ...form, password: event, }
                        )}
                        otherStyles="mt-7"
                        placeholder="Введите пароль"
                        type="password"
                    />

                    <CustomButton
                        title="Войти"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={loading}
                    />

                    <View className="justify-center flex-row pt-5 gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Нет аккаунта?
                        </Text>
                        <Link
                            href="/sign-up"
                            className='text-lg font-psemibold text-secondary'
                        >
                            Зарегистрироваться
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn