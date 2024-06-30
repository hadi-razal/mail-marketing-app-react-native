import React, { FC, useCallback } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { Ionicons } from '@expo/vector-icons';

interface EmailImportModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const EmailImportModal: FC<EmailImportModalProps> = ({ isOpen, setIsOpen }) => {
    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleImportFile = useCallback(async () => {
        try {
            const result: any = await DocumentPicker.getDocumentAsync({
                type: [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel',
                ],
            });

            if (result.type === 'success') {
                const emails = await extractEmailsFromExcel(result.uri);
                Alert.alert('Emails Imported', emails.join(', '));
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to import file.');
        }
    }, []);

    const extractEmailsFromExcel = useCallback(async (fileUri: string) => {
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const emails: string[] = [];

        workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            data.forEach((row: any) =>
                row.forEach((cell: any) => {
                    if (typeof cell === 'string' && cell.includes('@')) {
                        emails.push(cell);
                    }
                })
            );
        });

        return emails;
    }, []);

    return (
        <View
            className={`absolute flex items-center justify-center w-full min-h-screen transition-opacity ease-in-out duration-300 px-10 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            style={{ backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.4)' : 'rgba(15, 23, 42, 0)' }}
        >
            <View className='relative shadow-lg bg-gray-800 px-12 flex items-center justify-center rounded-md h-[200px] w-full z-10'>
                <Pressable onPress={handleImportFile} className='mb-2 flex w-full flex-col items-center justify-center py-5 px-3 bg-primaryColor rounded-sm'>
                    <Text className='text-white text-lg'>Import</Text>
                </Pressable>
                <Text className='text-gray-100 opacity-75'>
                    Import Excel files to extract emails from it
                </Text>

                <Pressable onPress={handleCloseModal} className='absolute top-0 right-0 flex items-center justify-center w-14 h-14 rounded-full'>
                    <Ionicons name='close' color='white' size={24} />
                </Pressable>
            </View>
        </View>
    );
};

export default EmailImportModal;

