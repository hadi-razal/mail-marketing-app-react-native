import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link style={styles.title} href={'/home'}>Home</Link>
      <Link style={styles.title} href={'/loginModal'} >CLick Here to Login</Link>
      <Link style={styles.title} href={'/signupModal'} >CLick Here to Sign Up</Link>
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
    fontWeight: 800,
    color: 'white'
  }
});
