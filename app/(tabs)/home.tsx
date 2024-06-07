import { StyleSheet, View, Text } from 'react-native';


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
    paddingTop: 100
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: 'white'
  }
});
