import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MeditationScreen from "../Screens/MeditationScreen";
import MusicPlayer from "../Screens/MusicPlayer";
import HomeScreen from "../Screens/HomeScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../src/Types";
import { FontAwesome } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: "#000",
        tabBarActiveTintColor: "#4c9145",
        tabBarStyle: { backgroundColor: "#fff", marginTop: insets.top },
        tabBarIndicatorStyle: {
          borderBottomColor: "#4c9145",
          borderBottomWidth: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <MaterialCommunityIcons name="meditation" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MusicPlayer"
        component={MusicPlayer as React.FC}
        initialParams={{ music: "" }}
        options={{
          tabBarLabel: ({ color }) => (
            <FontAwesome name="play" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
