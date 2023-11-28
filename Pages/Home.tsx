import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MeditationScreen from '../Screens/MeditationScreen';
import PlayScreen from '../Screens/PlayScreen';
import HomeScreen from '../Screens/HomeScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const insets = useSafeAreaInsets();
  return (
      <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#4c9145',
        tabBarStyle: { backgroundColor: '#fff', marginTop: insets.top },
        tabBarIndicatorStyle: {
          borderBottomColor: '#4c9145',
          borderBottomWidth: 2,
        },
      }}>
        <Tab.Screen name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Entypo name="home" size={40} color={color} />          
          ),
        }} 
        />
        <Tab.Screen name="Meditation" 
        component={MeditationScreen} 
        options={{
          tabBarLabel: ({color}) => (
            <MaterialCommunityIcons name="meditation" size={50} color={color} />
          ),
        }}
        />
        <Tab.Screen name="OnplayScreen" 
        component={PlayScreen} 
        options={{
          tabBarLabel: ({color}) => (
            <Feather name="play" size={40} color={color} />
          ),
        }}
        />
      </Tab.Navigator>
  );
}