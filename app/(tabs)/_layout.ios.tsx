
import React from 'react';
import { Tabs } from 'expo-router/unstable-native-tabs';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <IconSymbol ios_icon_name="magnifyingglass" android_material_icon_name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="training-log"
        options={{
          title: 'Log',
          tabBarIcon: ({ color }) => (
            <IconSymbol ios_icon_name="list.bullet" android_material_icon_name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="providers"
        options={{
          title: 'Providers',
          tabBarIcon: ({ color }) => (
            <IconSymbol ios_icon_name="person.2.fill" android_material_icon_name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol ios_icon_name="person.fill" android_material_icon_name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
