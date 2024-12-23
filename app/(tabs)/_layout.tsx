import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';  // Importing Ionicons
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderTopWidth: 0,
            shadowOpacity: 0.1,
          },
          android: {
            elevation: 4,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />, // Home icon
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'Time Table',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar" color={color} />, // Time Table icon
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          title: 'Exams',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="clipboard" color={color} />, // Exams icon
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="people" color={color} />, // Classroom icon
        }}
      />
    </Tabs>
  );
}
