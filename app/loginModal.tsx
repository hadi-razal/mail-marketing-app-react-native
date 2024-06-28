import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Link, router } from 'expo-router';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';

const LoginModal = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            console.log(data.session?.access_token);
            if (data.session?.access_token) {
                return router.push('/home');
            }
            console.log(data);
            setLoading(false);
            alert('Login Failed');
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-gray-100'>

            <View className="flex flex-col items-center px-6 py-8  pt-[80px]">


                <View className='w-full items-start justify-start '>
                    <Text className="text-primaryColor text-2xl font-bold text-start">Mail Motion</Text>
                    <Text className="text-gray-500 text-base mb-4">Sign up to continue</Text>
                </View>

                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 mb-4 focus:outline-none "
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 mb-4 focus:outline-none"
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />

                <Pressable onPress={handleLogin} className="rounded-md bg-primaryColor py-4 px-4 text-center text-white font-medium disabled:opacity-50 w-full">

                    <Text className='text-white text-center'>{loading ? 'Logging in...' : 'Login'}</Text>

                </Pressable>


                <View className="mt-4 flex flex-col items-center justify-center gap-1 py-3">

                    <Text>Dont have an account?{" "}<Link href={'/signupModal'} className="text-blue-800 text-sm" >Sign up</Link></Text>

                    <Link href={'/forgotpassword'} className="text-blue-800 text-sm">
                    Forgot Password?
                    </Link>

                </View>

            </View>

        </ScrollView >
    );
};

export default LoginModal;
