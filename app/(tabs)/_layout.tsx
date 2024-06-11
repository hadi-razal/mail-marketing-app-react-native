import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondaryColor,
        tabBarStyle: {
          backgroundColor: Colors.primaryColor,
        },
      }}>

      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="createMail"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='add-circle' color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
