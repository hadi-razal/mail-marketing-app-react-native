import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { supabase } from '../../utils/supabase';
import { router } from 'expo-router';

export default function TabTwoScreen() {

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/') 
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: Colors.primaryColor,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.secondaryColor,
    fontSize: 16,
  },
});
