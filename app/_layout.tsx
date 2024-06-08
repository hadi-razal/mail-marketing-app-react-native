import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signupModal" options={{ title: "Sign Up", headerShown: false }} />
        <Stack.Screen name="loginModal" options={{ title: "Login", headerShown: false }} />

      </Stack>
    </ThemeProvider >
  );
}
