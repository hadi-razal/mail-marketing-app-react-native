import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function HomeScreen() {

  // const [fontsLoaded] = useFonts({
  //   'CedarvilleCursive': require('./assets/fonts/CedarvilleCursive-Regular.ttf'),
  // });

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Link style={[styles.title, styles.fontfam]} href={'/home'}>Mail Motion Your Marketing Partner</Link>
      <Link style={[styles.title, styles.fontfam]} href={'/loginModal'}>Click Here to Login</Link>
      <Link style={[styles.title, styles.fontfam]} href={'/signupModal'}>Click Here to Sign Up</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    height: '100%',
    gap: 8,
    paddingTop: 100
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white'
  },
  fontfam: {
    fontFamily: 'Poppins-Bold',
    // fontWeight: 800
  }
});
