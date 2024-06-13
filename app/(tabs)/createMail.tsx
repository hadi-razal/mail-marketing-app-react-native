import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import { supabase } from '../../utils/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { FontAwesome } from '@expo/vector-icons';




export default function CreateMailScreen() {
    const [subject, setSubject] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [image, setImage] = useState<any | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        };

        const result = await ImagePicker.launchImageLibraryAsync(options);



        if (!result.canceled) {
            setImage(result.assets[0])

        }
    };

    const uploadImage = async () => {
        setUploading(true);

        try {
            if (image) {
                const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
                const filePath = `/${new Date().getTime()}.${image.type === 'image' ? 'png' : 'mp4'}`;
                const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';
                const res = await supabase.storage.from('images').upload(filePath, decode(base64), { contentType });
                console.log(res);
            } else {
                console.log('No image selected');
            }

        } catch (error: any) {
            Alert.alert('Error', error.message);
            console.error('Upload Error:', error);
            return null;
        } finally {
            setUploading(false);
        }
    };


    const handleSend = async () => {
        let imageUrl = null;
        if (image) {
            imageUrl = await uploadImage();
        }
        Alert.alert('Email Sent', `Subject: ${subject}\nBody: ${body}\nImage: ${imageUrl}`);
    };


    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={styles.title}>Create New Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                    placeholderTextColor="#aaa"
                    value={subject}
                    onChangeText={setSubject}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Description"
                    placeholderTextColor="#aaa"
                    value={body}
                    onChangeText={setBody}
                    multiline
                />
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <FontAwesome name="image" size={20} color="#fff" />
                    <Text style={styles.imagePickerText}>Pick an image</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image.uri }} style={styles.image} />}
                <View style={styles.uploadBtn}>
                    {uploading ? (
                        <ActivityIndicator size="large" color={Colors.primaryColor} />
                    ) : (
                        <Button title="Send Email" onPress={handleSend} color={Colors.secondaryColor} />
                    )}
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 12,
        height: '100%',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.primaryColor,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#2D5C4E',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    imagePicker: {
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imagePickerText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 20,
        borderRadius: 10,
    }, uploadBtn: {
        backgroundColor: Colors.primaryColor,
        color: Colors.secondaryColor,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
});
