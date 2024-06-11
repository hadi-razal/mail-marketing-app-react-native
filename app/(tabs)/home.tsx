import { StyleSheet, View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [subscribers, setSubscribers] = useState<any>([]);
  const [emailsSent, setEmailsSent] = useState(10);

  const addSubscriber = () => {
    if (email) {
      setSubscribers([...subscribers, email]);
      Alert.alert('Subscriber Added', `Email: ${email}`);
      setEmail('');
      Keyboard.dismiss();  // Close the keyboard
    } else {
      Alert.alert('Error', 'Please enter an email');
    }
  };

  const renderSubscriber = ({ item }: any) => (
    <View style={styles.subscriberItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Mail Motion</Text> */}
      <View style={styles.hero}>
        <Text style={styles.heroText}>Emails Sent : {emailsSent}</Text>
        <Text style={styles.heroText}>Total Subscribers : {subscribers.length}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Add Subscribers</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.addButton} onPress={addSubscriber}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subscribersContainer}>
        <Text style={styles.subscribersTitle}>Subscribers List</Text>
        <FlatList
          data={subscribers}
          renderItem={renderSubscriber}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.subscriberList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.primaryColor,
    textAlign: 'center',
    paddingBottom: 10,
  },
  hero: {
    backgroundColor: Colors.primaryColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  heroText: {
    fontSize: 25,
    fontWeight: "300",
    color: Colors.secondaryColor,
  },
  inputContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    width: '100%',
    fontSize: 26,
    color: Colors.primaryColor,
    marginRight: 10,
    paddingVertical: 10,
    fontWeight: '600'
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#2D5C4E',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    // marginRight: 10,
  },
  addButton: {
    backgroundColor: Colors.primaryColor,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subscribersContainer: {
    width: '100%',
    flex: 1,
  },
  subscribersTitle: {
    width: '100%',
    fontSize: 26,
    color: Colors.primaryColor,
    marginBottom: 10,
    fontWeight: '600'
  },
  subscriberList: {
    flexGrow: 1,
  },
  subscriberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
