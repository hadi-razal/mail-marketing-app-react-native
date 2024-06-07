import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

const SignUpModal = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.welcomeScreen}>
                    {/* <Image source={require('../assets/images/icon.png')} style={styles.logo} /> */}
                    <Text style={styles.title}>Mail Motion</Text>
                    <Text style={styles.description}>Mail Motion is a mail marketing application designed to help you create, manage, and track email campaigns effectively. Engage your audience with personalized content and optimize your marketing strategies.</Text>
                </View>
                <View style={styles.loginScreen}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.signInText}>Sign Up to continue</Text>
                    <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#aaa" />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        {/* <Link href={'/signupModal'} style={styles.footerText}>Sign up</Link> */}
                        {/* <Text style={styles.footerText}>Forgot Password?</Text> */}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUpModal;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#2D5C4E',
    },
    welcomeScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        color: '#fff',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 19,
        fontWeight: '100',
        textAlign: 'center',
        paddingHorizontal: 15,
        lineHeight: 19,
        color: Colors.secondaryColor,
    },
    loginScreen: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 40,
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
        justifyContent: 'space-between',
        width: '100%',
    },
    footerText: {
        color: '#2D5C4E',
        fontSize: 16,
        textAlign: 'center'
    },
});
