import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { icons } from '@/constants'

const TabsLayout = () => {

  interface Props {
    icon: ImageSourcePropType,
    color: string
  }

  const TabIcon = ({ icon, color }: Props) => {
    return (
      <View className="items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode='contain'
          tintColor={color}
        />
      </View>
    )
  }

  return (
    <>
      <View className='h-full bg-primary'>
        <Tabs screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#3086DB',
          tabBarInactiveTintColor: '#124D87',
          tabBarStyle: {
            // '#001F3F' bg color of tab in hex code without opacity
            backgroundColor: 'rgba(0, 31, 63, 0.5)',
            borderTopWidth: 1,
            borderTopColor: '#124D87',
            borderLeftWidth: 1,
            borderLeftColor: '#124D87',
            borderRightWidth: 1,
            borderRightColor: '#124D87',
            height: 84,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            // Prevent background leakage
            elevation: 0, // For Android
            shadowOpacity: 0, // For iOS
          }
        }}>
          <Tabs.Screen name="index" options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.home} color={color} />
            )
          }} />
          <Tabs.Screen name="quiz" options={{
            title: "Quiz",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.quiz} color={color} />
            )
          }} />
          <Tabs.Screen name="create" options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <View className='h-[69px] w-[69px] rounded-full items-center justify-center bg-primary border-2 border-secondary focus:border-activeColor'>
                <TabIcon icon={icons.create} color={color} />
              </View>
            )
          }} />
          <Tabs.Screen name="edit" options={{
            title: "Edit",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.edit} color={color} />
            )
          }} />
          <Tabs.Screen name="analytics" options={{
            title: "Analytics",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon icon={icons.analytics} color={color} />
            )
          }} />
        </Tabs>
      </View>
      <StatusBar
        backgroundColor='#121212'
        style='light'
      />
    </>
  )
}

export default TabsLayout