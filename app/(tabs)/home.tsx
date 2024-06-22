import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';
import { supabase } from '../../utils/supabase';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [subscribers, setSubscribers] = useState<any>([]);
  const [emailsSent, setEmailsSent] = useState(10);

  const addSubscriber = async () => {
    if (email) {
      setSubscribers([...subscribers, email]);
      Alert.alert('Subscriber Added', `Email: ${email}`);



      const { data } = await supabase.auth.getSession()


      const { error } = await supabase.from('subscribers').insert({
        id: 1,
        email: email,
      })

      setEmail('');

      Keyboard.dismiss();
      console.log(error)
    } else {
      Alert.alert('Error', 'Please enter an email');
    }
  };

  const renderSubscriber = ({ item }: any) => (
    <View style={styles.subscriberItem}>
      <Text style={styles.subscriberText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Mail Motion</Text>
      <View style={styles.hero}>
        <Text style={styles.heroText}>Emails Sent : {emailsSent}</Text>
        <Text style={styles.heroText}>Total Subscribers : {subscribers.length}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Add Subscribers</Text>
        <View style={styles.inputWrapper}>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  hero: {
    backgroundColor: Colors.primaryColor,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  heroText: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.secondaryColor,
  },
  inputWrapper: {
    height: 50,
    flexDirection: 'row'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 20,
    color: Colors.primaryColor,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: Colors.primaryColor,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  subscribersContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  subscribersTitle: {
    fontSize: 22,
    color: Colors.primaryColor,
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  subscriberList: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  subscriberItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subscriberText: {
    fontSize: 16,
    color: '#333',
  },
});
