import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{headerShown:false}} />
        <Tabs.Screen name="quiz" options={{headerShown:false}} />
        <Tabs.Screen name="create" options={{headerShown:false}} />
        <Tabs.Screen name="edit" options={{headerShown:false}} />
        <Tabs.Screen name="analytics" options={{headerShown:false}} />
    </Tabs>
  )
}

export default TabsLayout