import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { supabase } from '../../utils/supabase';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [emailsSent, setEmailsSent] = useState(10);

  const addSubscriber = async () => {
    if (email) {
      const newSubscribers = [...subscribers, email];
      Alert.alert('Subscriber Added', `Email: ${email}`);

      await supabase.from('subscribers').insert({ email })

      setEmail('');
    } else {
      Alert.alert('Error', 'Please enter an email');
    }
  };

  const renderSubscriber = ({ item }:any) => (
    <View className="p-4 border-b border-gray-300">
      <Text className="text-base text-gray-700">{item}</Text>
    </View>
  );

  return (
    <View style={{ flexGrow: 1, backgroundColor: 'bg-gray-100' }}>
      <View className="flex items-center pt-[120] p-4 ">
        <Text className="text-3xl font-bold text-primaryColor mb-6">Welcome to Mail Motion</Text>
        <View className="bg-primaryColor w-full items-center justify-center p-4 rounded-lg mb-8">
          <Text className="text-xl font-semibold text-white mb-2">Emails Sent : {emailsSent}</Text>
          <Text className="text-xl font-semibold text-white">Total Subscribers : {subscribers.length}</Text>
        </View>
        <View className="w-full mb-8">
          <Text className="text-xl text-primaryColor mb-2 font-semibold">Add Subscriber</Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 h-12 border border-gray-300 rounded-lg px-4 mr-4 bg-white"
              placeholder="Enter email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              className="bg-primaryColor h-12 rounded-lg px-6 flex items-center justify-center"
              onPress={addSubscriber}
            >
              <Text className="text-white font-semibold text-lg">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full">
          <Text className="text-xl text-primaryColor mb-2 font-semibold">Subscribers List</Text>
          <FlatList
            data={subscribers}
            renderItem={renderSubscriber}
            keyExtractor={(item, index) => index.toString()}
            className="bg-white rounded-lg p-4"
          />
        </View>
      </View>
    </View>
  );
}

