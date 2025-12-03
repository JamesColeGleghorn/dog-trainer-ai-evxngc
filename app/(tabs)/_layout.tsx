
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'search',
      label: 'Search',
    },
    {
      name: 'training-log',
      route: '/(tabs)/training-log',
      icon: 'list',
      label: 'Log',
    },
    {
      name: 'providers',
      route: '/(tabs)/providers',
      icon: 'people',
      label: 'Providers',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Profile',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="training-log" name="training-log" />
        <Stack.Screen key="providers" name="providers" />
        <Stack.Screen key="profile" name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
