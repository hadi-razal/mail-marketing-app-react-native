import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { supabase } from '../../utils/supabase';
import { router } from 'expo-router';

export default function TabTwoScreen() {

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View className="flex flex-col items-center justify-center bg-gray-100 p-8 min-h-screen">
      <Text className="text-3xl font-bold text-gray-800 mb-8">Profile</Text>

      <Pressable
        className="bg-red-500 py-2 px-4 rounded-md text-center text-white font-medium"
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </Pressable>

      {/* Add more content here! */}
      <View className="mt-8 space-y-4">
        <Text className="text-gray-700">User Information:</Text>
        <View className="flex flex-row items-center space-x-4">
          <Text className="font-medium text-gray-800">Email:</Text>
          <Text className="text-gray-600">your_email@example.com</Text>
        </View>
        <View className="flex flex-row items-center space-x-4">
          <Text className="font-medium text-gray-800">Username:</Text>
          <Text className="text-gray-600">your_username</Text>
        </View>
        {/* Add more user information fields as needed */}
      </View>
      <View className="mt-8">
        {/* Add other profile sections or actions here */}
      </View>
    </View>
  );
}
