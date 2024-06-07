import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Colors } from '@/constants/Colors';

const FONT_FAMILY = 'Poppins-Bold'; // Replace with actual font path

export default function HomeScreen() {
  const [loaded] = useFonts({ FONT_FAMILY });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mail Motion: Your Marketing Partner</Text>

      {/* Call to action links */}
      <View style={styles.ctaContainer}>
        <Link href={'/loinModal'} style={styles.ctaText}>Login</Link>
        <Link href={'/signupModal'} style={styles.ctaText}>Sign Up</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill entire screen vertically
    backgroundColor: '#F4F6F7', // Light gray background
    paddingHorizontal: 20, // Horizontal padding
    paddingTop: 100, // Top padding
    flexDirection: 'column',
    justifyContent: 'space-between', // Align content at top
  },
  heading: {
    fontFamily: FONT_FAMILY,
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333', // Dark gray heading text
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute CTAs evenly
    marginTop: 50, // Margin top for spacing
  },
  ctaButton: {
    backgroundColor: '#007BFF', // Blue background for CTAs
    padding: 15,
    borderRadius: 5, // Rounded corners for buttons
  },
  ctaText: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primayColor,
    backgroundColor: Colors.secondaryColor // White text for CTAs
  },
});