import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../constants/Colors';
export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Home</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 80,
    paddingHorizontal: 12,
  },
  hero: {
    backgroundColor: Colors.primayColor,
    width: '100%',
    height: 300,
    borderRadius: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: Colors.primayColor
  }, logoText: {
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 10,
    color: Colors.primayColor
  }
});
