import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

const EmailImportModal = ({ setIsOpen, isOpen }: any) => {

    return (

        <View className='absolute flex items-center  justify-center w-full min-h-screen  bg-opacity-5 px-12 transition-all ease-in-out duration-300'>

            <View className='relative bg-gray-800 px-12  flex items-center justify-center   rounded-md h-[200px] w-full z-10'>

                <Pressable className='flex w-full flex-col items-center justify-center py-5 px-3 bg-primaryColor rounded-sm'>
                    <Text className='text-white'>
                        Import Mail
                    </Text>
                </Pressable>

                <Pressable onPress={() => setIsOpen(false)} className='absolute top-1 right-1 flex items-center justify-center w-14 h-14 rounded-full  '>
                    <Ionicons name='close' color='white' size={24} />
                </Pressable>

            </View>

        </View >
    )

}

export default EmailImportModal;