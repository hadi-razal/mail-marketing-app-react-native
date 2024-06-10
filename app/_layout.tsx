import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import React from 'react';
import { View, Text } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load custom fonts with absolute path (optional):
  const [fontsLoaded] = useFonts({
    CedarvilleCursive: require('../assets/fonts/CedarvilleCursive-Regular.ttf')
  });

  const hideSplashScreen = useCallback(async () => {
    if (fontsLoaded) {
      console.log('Fonts are loaded, hiding splash screen...');
      await SplashScreen.hideAsync();
    } else {
      console.log('Fonts are not loaded yet...');
    }
  }, [fontsLoaded]);

  useEffect(() => {
    console.log('Fonts loaded status:', fontsLoaded);
    hideSplashScreen();
  }, [fontsLoaded, hideSplashScreen]);

  if (!fontsLoaded) {
    console.log("Fonts are not loaded yet...");
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  console.log("Fonts loaded, rendering app");
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="+not-found" /> */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signupModal" options={{ title: "Sign Up", headerShown: false }} />
        <Stack.Screen name="loginModal" options={{ title: "Login", headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
