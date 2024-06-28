import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/Colors';
import { supabase } from '../utils/supabase';

export default function LandingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session?.access_token) {
        router.replace('/home');
      } else {
        setLoading(false);
      }
    };

    checkUser();

  }, []);

 

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='bg-grey-300' style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Mail Motion</Text>
        <Text style={styles.desc}>
          Mail Motion is a mail marketing application designed to help you create, manage, and track email campaigns effectively. Engage your audience with personalized content and optimize your marketing strategies.
        </Text>
      </View>

      <View style={styles.ctaContainer}>
        <Pressable onPress={() => router.push('/loginModal')} style={styles.btnContainer}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/signupModal')} style={styles.btnContainer}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    paddingTop: 100,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  headingContainer: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  heading: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
  desc: {
    fontSize: 19,
    fontWeight: '100',
    textAlign: 'center',
    paddingHorizontal: 15,
    lineHeight: 25,
    color: Colors.secondaryColor,
  },
  ctaContainer: {
    flexDirection: 'column',
    gap: 5,
    backgroundColor: Colors.secondaryColor,
    paddingHorizontal: 25,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    height: '40%'
  },
  btnContainer: {
    paddingVertical: 20,
    borderRadius: 10,
    width: '100%',
    backgroundColor: Colors.primaryColor,
    marginVertical: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
});
