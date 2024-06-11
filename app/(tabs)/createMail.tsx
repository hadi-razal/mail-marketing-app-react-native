import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/Colors';
import { supabase } from '../../utils/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';


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
                    value={subject}
                    onChangeText={setSubject}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Body"
                    value={body}
                    onChangeText={setBody}
                    multiline
                />
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Text style={styles.imagePickerText}>Pick an image</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image.uri }} style={styles.image} />}
                {uploading ? (
                    <ActivityIndicator size="large" color={Colors.primaryColor} />
                ) : (
                    <Button title="Send Email" onPress={handleSend} color={Colors.primaryColor} />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
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
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: "100%",
        marginBottom: 20,
        borderRadius: 10,
    },
});
