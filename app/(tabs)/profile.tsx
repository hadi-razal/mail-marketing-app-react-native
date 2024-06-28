import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { supabase } from '../../utils/supabase';
import { router } from 'expo-router';


export default function Profile() {


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View className={`flex gap-3 flex-col items-center justify-start pt-[80] px-4 min-h-screen`}>

      {/* Profile Header */}
      <Text className="text-[40px] font-bold text-primaryColor ">Profile</Text>
      <View className="">
        <Image
          className="w-16 h-16 rounded-full bg-gray-200 border border-white object-cover" // Placeholder for profile picture
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user's profile picture URL or default placeholder
        />
      </View>


      {/* User Information Section */}
      <View className="px-4 py-2 rounded-sm">
        <Text className="text-gray-700 text-xl font-medium mb-2 text-center">User Information</Text>
        <View className="flex flex-row items-center space-x-4">
          <Text className="font-medium text-gray-800">Email:</Text>
          <Text className="text-gray-600">your_email@example.com</Text>
        </View>
        <View className="flex flex-row items-center space-x-4">
          <Text className="font-medium text-gray-800">Username:</Text>
          <Text className="text-gray-600">your_username</Text>
        </View>
      </View>


      <Pressable
        className={`bg-red-600 py-3 px-4 rounded-md text-center text-white font-medium`}
        onPress={handleLogout}
      >
        <Text className='text-white'>Logout</Text>
      </Pressable>


    </View>
  );
}
