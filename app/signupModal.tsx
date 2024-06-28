import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Pressable, Platform, ToastAndroid } from 'react-native';
import { supabase } from '../utils/supabase';
import { Link } from 'expo-router';

const SignUpModal = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignUp = async () => {
        if (!email || !password || !name) {
            if (Platform.OS === 'android') {
                ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
            } else {
                Alert.alert('Please fill in all fields');
            }
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            const { data, error: insertError } = await supabase.from('users').insert({
                name,
                email,
            });

            if (insertError) throw insertError;

            setIsLoading(false);
            // Handle successful sign-up, e.g., navigate to the login screen or home screen.
        } catch (error: any) {
            setIsLoading(false);
            console.error(error.message);
            if (Platform.OS === 'android') {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-gray-100'>
            <View className="flex flex-col items-center px-6 py-8 pt-[80px]">

                <View className='w-full items-start justify-start '>
                    <Text className="text-primaryColor text-2xl font-bold text-start">Mail Motion</Text>
                    <Text className="text-gray-500 text-base mb-4">Sign up to continue</Text>
                </View>

                <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 mb-4 focus:outline-none"
                    placeholder="Name"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 mb-4 focus:outline-none"
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 mb-4 focus:outline-none"
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />
                <Pressable
                    onPress={handleSignUp}
                    className={`rounded-md bg-primaryColor py-4 px-4 text-center text-white font-medium w-full ${isLoading ? 'opacity-50' : ''}`}
                    disabled={isLoading}
                >
                    <Text className='text-white text-center'>{isLoading ? 'Signing up...' : 'Sign Up'}</Text>
                </Pressable>

                <View className="mt-4 flex flex-col items-center justify-center gap-1 py-3">
                    <Text>Already have an account?{" "}
                        <Link href={'/loginModal'} className="text-blue-800 text-sm">Login</Link>
                    </Text>
                    <Link href={'/forgotpassword'} className="text-blue-800 text-sm">Forgot Password?</Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpModal;
