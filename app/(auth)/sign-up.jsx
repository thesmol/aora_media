import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false);

  const submit = () => {

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
            Регистрация в Aora
          </Text>

          <CustomInput
            title="Никнейм"
            value={form.username}
            handleChangeText={(event) => setForm(
              { ...form, username: event.nativeEvent.text, }
            )}
            otherStyles="mt-10"
            placeholder="Введите никнейм"
          />

          <CustomInput
            title="Почта"
            value={form.email}
            handleChangeText={(event) => setForm(
              { ...form, email: event.nativeEvent.text, }
            )}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Введите почту"
          />

          <CustomInput
            title="Пароль"
            value={form.password}
            handleChangeText={(event) => setForm(
              { ...form, password: event.nativeEvent.text, }
            )}
            otherStyles="mt-7"
            placeholder="Введите пароль"
            type="password"
          />

          <CustomButton
            title="Зарегистрироваться"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={loading}
          />

          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Уже есть аккаунт?
            </Text>
            <Link
              href="/sign-in"
              className='text-lg font-psemibold text-secondary'
            >
              Войти
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp