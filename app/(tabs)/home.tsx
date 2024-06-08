import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 80
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: 'white'
  }, logoText: {
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 10,
    color: Colors.primayColor
  }
});
