import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Pressable, Platform, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../utils/supabase';


const SignModal = () => {


    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')


    const handleSignUp = async () => {
        try {
            if (!email || !password || !name) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show("Error", ToastAndroid.SHORT)
                } else {
                    alert("Error");
                }
                return;
            }
            setLoading(true)
            const { data } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            const { error } = await supabase.from('users').insert({
                name: name,
                email: email,
            })
            console.log(data)
            setLoading(false)
            if (error) Alert.alert(error.message)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>



            <View style={styles.loginScreen}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.signInText}>Sign in to continue</Text>
                <TextInput value={name} onChangeText={(text) => setName(text)} style={styles.input} placeholder="Full Name" placeholderTextColor="#aaa" />
                <TextInput value={email} onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
                <TextInput value={password} onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />
                <Pressable onPress={handleSignUp} style={styles.loginButton}>
                    <Text disabled={loading} style={styles.loginButtonText}>{loading ? "Creating Account.." : "Sign Up"}</Text>
                </Pressable>
                <View style={styles.footer}>
                    {/* <Link href={'/signupModal'} style={styles.footerText}>Sign up</Link> */}
                    {/* <Text style={styles.footerText}>Forgot Password?</Text> */}
                </View>
            </View>
        </ScrollView>

    );
};

export default SignModal;

const styles = StyleSheet.create({
    loginScreen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 40,
        paddingTop: 80,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D5C4E',
    },
    signInText: {
        fontSize: 16,
        color: '#2D5C4E',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#2D5C4E',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#2D5C4E',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    footerText: {
        color: '#2D5C4E',
        fontSize: 16,
        textAlign: 'center'
    },
});
