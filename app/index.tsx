import { StyleSheet, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { Colors } from '../constants/Colors';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: Colors.primayColor,
    paddingTop: 100,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  headingContainer: {
    backgroundColor: Colors.primayColor,
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
    backgroundColor: Colors.primayColor,
    marginVertical: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.secondaryColor,
  },
});
