import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'

interface EmailImportModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const EmailImportModal = ({ isOpen, setIsOpen }: EmailImportModalProps) => {
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleImportFile = () => {
  }

  return (
    <View
      className={`absolute flex items-center justify-center w-full min-h-screen bg-slate-950 bg-opacity-[0] px-12 transition-all ease-in-out duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <View className='relative bg-gray-800 px-12 flex items-center justify-center rounded-md h-[200px] w-full z-10'>
        <Pressable onPress={handleImportFile} className='flex w-full flex-col items-center justify-center py-5 px-3 bg-primaryColor rounded-sm'>
          <Text className='text-white text-lg'>Import</Text>
        </Pressable>
        <Text className='text-gray-100 opacity-75'>
          Import Excel files to extract emails from it
        </Text>

        <Pressable onPress={handleCloseModal} className='absolute top-1 right-1 flex items-center justify-center w-14 h-14 rounded-full'>
          <Ionicons name='close' color='white' size={24} />
        </Pressable>
      </View>
    </View>
  )
}

export default EmailImportModal
