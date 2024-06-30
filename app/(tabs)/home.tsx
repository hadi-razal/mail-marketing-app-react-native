import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ToastAndroid } from 'react-native';
import { supabase } from '../../utils/supabase';
import { FontAwesome6 } from '@expo/vector-icons';
import EmailImportModal from '../../components/EmailImportModal';

interface Subscriber {
  email: string;
}

export default function HomeScreen() {
  const [email, setEmail] = useState<string | any>('');
  const [isOpen, setIsOpen] = useState<boolean>();

  const handleSubmit = async () => {
    const { error } = await supabase.from('subscribers').insert({ email });
    if (error) {
      Alert.alert('Subscription error', error.message);
      ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);

    } else {
      setEmail('');
      ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
      Alert.alert('Success', 'Successfully subscribed!');
    }
  };

  return (
    <View
      className='flex relative flex-col justify-start min-h-screen pt-[50px]'
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
            className='bg-white p-4 rounded-sm  text-[15px] mb-4'
          />
          <Pressable onPress={handleSubmit} className='bg-primaryColor shadow-sm p-4 rounded-sm'>
            <Text className='text-white text-center font-bold'>Make a Subscriber</Text>
          </Pressable>
        </View>
        <View>
          <Text className='text-center  font-extralight text-gray-500 mt-2'>
            to add emails from a excel file then click on the plus
          </Text>
        </View>
      </View>

      {!isOpen &&
        <Pressable onPress={() => setIsOpen(!isOpen)} className='absolute shadow-lg flex items-center justify-center w-14 h-14 rounded-full bg-primaryColor bottom-20 right-7'>
          <FontAwesome6 name='plus' color='white' size={24} />
        </Pressable>}

      {isOpen && <EmailImportModal isOpen={isOpen} setIsOpen={setIsOpen} />}

    </View>
  );
}
