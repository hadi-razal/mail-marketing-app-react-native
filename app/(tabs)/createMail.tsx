import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../utils/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { FontAwesome } from '@expo/vector-icons';
import 'nativewind';

export default function CreateMailScreen() {
    const [subject, setSubject] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [image, setImage] = useState<any | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissions required', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        };

        const result = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    const uploadImage = async () => {
        setUploading(true);

        try {
            if (image) {
                const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
                const filePath = `/${new Date().getTime()}.${image.type === 'image' ? 'png' : 'mp4'}`;
                const contentType = image.type === 'image' ? 'image/png' : 'video/mp4';
                const res: any = await supabase.storage.from('images').upload(filePath, decode(base64), { contentType });
                console.log(res);
                return res.data?.Key;
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
        Alert.alert('Email Sent', `Subject: ${subject}\nTitle: ${title}\nBody: ${body}\nImage: ${imageUrl}`);
    };

    return (
        <ScrollView className="flex-1 pt-20 px-4 bg-gray-100">
            <View className="flex-1">
                <Text className="text-2xl font-bold text-primaryColor mb-6 text-center">Send A New Email</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white"
                    placeholder="Subject"
                    placeholderTextColor="#aaa"
                    value={subject}
                    onChangeText={setSubject}
                />
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white"
                    placeholder="Title"
                    placeholderTextColor="#aaa"
                    value={title}
                    onChangeText={setTitle}
                    multiline
                />
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white"
                    placeholder="Description"
                    placeholderTextColor="#aaa"
                    value={body}
                    onChangeText={setBody}
                    multiline
                    style={{ height: 100 }}
                />

                {!image ? (
                    <Pressable className="bg-primaryColor  p-4 rounded-lg mb-6 flex-row items-center justify-center" onPress={pickImage}>
                        <FontAwesome name="image" size={20} color="#fff" />
                        <Text className="text-white text-lg ml-3">Pick an image</Text>
                    </Pressable>
                ) : (
                    <View className="relative mb-6">
                        <Pressable
                            className="absolute top-2 right-2 bg-red-500 w-10 h-10 rounded-full flex items-center justify-center"
                            onPress={() => setImage(null)}
                        >
                            <FontAwesome name="remove" size={20} color="#fff" />
                        </Pressable>
                        <Image source={{ uri: image.uri }} className="w-full h-52 rounded-lg" />
                    </View>
                )}

                <Pressable
                    className={`bg-primaryColor p-4 rounded-lg flex items-center justify-center ${uploading ? 'opacity-50' : ''}`}
                    onPress={handleSend}
                    disabled={uploading}
                >
                    {uploading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text className="text-white text-lg">Send</Text>
                    )}
                </Pressable>
            </View>
        </ScrollView>
    );
}
