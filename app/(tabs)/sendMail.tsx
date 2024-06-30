import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../utils/supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { FontAwesome } from '@expo/vector-icons';


export default function SendMailScreen() {
    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState<any | null>(null);
    const [uploading, setUploading] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
    });

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissions required', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        };

        const result: any = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.cancelled) {
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

    // Function to handle changes in social links inputs
    const handleChangeSocialLinks = (platform: 'facebook' | 'instagram' | 'twitter', link: string) => {
        setSocialLinks((prevLinks) => ({
            ...prevLinks,
            [platform]: link,
        }));
    };

    // Function to handle social link click (to be implemented)
    const handleSocialLink = (platform: string) => {
        // Implement logic to open respective social media links
        Alert.alert('Opening Social Link', `Opening ${platform} link`);
    };

    return (
        <ScrollView className="flex-1 pt-20 px-4 bg-gray-100">
            <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Email</Text>
            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white text-base"
                placeholder="Subject"
                placeholderTextColor="#aaa"
                value={subject}
                onChangeText={setSubject}
                textAlignVertical="top"
            />
            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white text-base"
                placeholder="Title"
                placeholderTextColor="#aaa"
                value={title}
                onChangeText={setTitle}
                multiline
                textAlignVertical="top"
            />
            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white text-base"
                placeholder="Description"
                placeholderTextColor="#aaa"
                value={body}
                onChangeText={setBody}
                multiline
                textAlignVertical="top"
                numberOfLines={4}
            />

            {!image ? (
                <Pressable className="bg-primaryColor px-4 py-4 rounded-lg mb-6 flex-row items-center justify-center" onPress={pickImage}>
                    <FontAwesome name="image" size={20} color="#fff" />
                    <Text className="text-white text-base ml-3">Add image</Text>
                </Pressable>
            ) : (
                <View className="relative flex items-center justify-center mb-6 ">
                    <Pressable className="absolute z-10 top-2 right-2 bg-red-500 w-10 h-10 rounded-full flex items-center justify-center" onPress={() => setImage(null)}>
                        <FontAwesome name="remove" size={20} color="#fff" />
                    </Pressable>
                    <Text>{image.fileName}</Text>
                    <Image source={{ uri: image.uri }} resizeMode="cover" className="rounded-lg" />
                </View>
            )}

            {/* Social Links Section */}
            <View className="mt-8">
                <Text className="text-lg font-semibold mb-2">Social Media Links:</Text>
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white text-base"
                    placeholder="Facebook Link"
                    placeholderTextColor="#aaa"
                    value={socialLinks.facebook}
                    onChangeText={(text) => handleChangeSocialLinks('facebook', text)}
                />
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white text-base"
                    placeholder="Instagram Link"
                    placeholderTextColor="#aaa"
                    value={socialLinks.instagram}
                    onChangeText={(text) => handleChangeSocialLinks('instagram', text)}
                />
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-4 mb-4 bg-white text-base"
                    placeholder="Twitter Link"
                    placeholderTextColor="#aaa"
                    value={socialLinks.twitter}
                    onChangeText={(text) => handleChangeSocialLinks('twitter', text)}
                />
            </View>

            {/* Send Button */}
            <Pressable className={`bg-primaryColor px-4 py-4 rounded-lg flex mb-[100px] items-center justify-center ${uploading ? 'opacity-50' : ''}`} onPress={handleSend} disabled={uploading}>
                {uploading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text className="text-white text-base">Send</Text>
                )}
            </Pressable>

        </ScrollView>
    );
}
