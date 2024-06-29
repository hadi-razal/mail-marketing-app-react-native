import React from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { supabase } from '../../utils/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';

interface Subscriber {
  email: string;
}

export default function HomeScreen() {
  const [email, setEmail] = React.useState('');

  const handleSubmit = async () => {
    const { error } = await supabase.from('subscribers').insert({ email });
    if (error) {
      Alert.alert('Subscription error', error.message);
    } else {
      setEmail('');
      Alert.alert('Success', 'Successfully subscribed!');
    }
  };

  return (
    <View
      className='flex flex-col justify-start min-h-screen pt-[80px]'
    >
      <View className='justify-center items-center p-5'>
        <Text className='text-primaryColor text-center font-bold text-[48px]'>
          Mail Motion
        </Text>
        <Text className='text-center text-gray-500 m-2'>
          Keep your followers up-to-date with the latest news and offers!
        </Text>
        <View className='rounded-sm w-full max-w-md'>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            placeholderTextColor="#ccc"
            className='bg-white p-4 rounded-sm text-[15px] mb-4'
          />
          <Pressable onPress={handleSubmit} className='bg-primaryColor p-4 rounded-sm'>
            <Text className='text-white text-center font-bold'>Subscribe</Text>
          </Pressable>
        </View>
        <View>
          <Text className='text-center  font-extralight text-gray-500 mt-2'>
            to add emails from a excel file then click on the plus
          </Text>
        </View>
      </View>
    </View>
  );
}
