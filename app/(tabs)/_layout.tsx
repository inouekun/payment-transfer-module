import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { Tabs } from 'expo-router';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <AntDesign name='home' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='payment'
        options={{
          tabBarLabel: 'Payment',
          tabBarIcon: ({ color, size }) => <AntDesign name='creditcard' color={color} size={size} />,
        }}
      />
    </Tabs>
  );
};

export default _layout;
