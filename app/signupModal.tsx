import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';


const SignModal = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.loginScreen}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.signInText}>Sign in to continue</Text>
                <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#aaa" />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    {/* <Link href={'/signupModal'} style={styles.footerText}>Sign up</Link> */}
                    <Text style={styles.footerText}>Forgot Password?</Text>
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
