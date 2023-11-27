import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Pages/Home";
import Playlist from "../Pages/Playlist";
import Podcast from "../Pages/Podcast";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export function BottomTabs() {
    return (
        <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                }
            }}>
                <Tab.Screen 
                    name="home" 
                    component={Home} 
                    options={{ 
                        tabBarLabel: "Accueil", 
                        headerShown: false, 
                        tabBarLabelStyle: { color: "#fff" }, 
                        tabBarIcon:({focused}) => 
                        focused ? (
                            <Entypo name="home" size={35} color="#61b15a" />
                        ) : (
                            <Entypo name="home" size={35} color="black" />
                        ) }} 
                />
                <Tab.Screen
                    name="playlist"
                    component={Playlist}
                    options={{ 
                        tabBarLabel: "Playlist", 
                        headerShown: false, 
                        tabBarLabelStyle: { color: "#fff" }, 
                        tabBarIcon:({focused}) => 
                        focused ? (
                            <MaterialCommunityIcons name="playlist-music" size={35} color="#61b15a" />
                        ) : (
                            <MaterialCommunityIcons name="playlist-music-outline" size={35} color="black" />
                        ) }}
                    />
                    <Tab.Screen
                    name="podcast"
                    component={Podcast}
                    options={{ 
                        tabBarLabel: "Podcast", 
                        headerShown: false, 
                        tabBarLabelStyle: { color: "#fff" }, 
                        tabBarIcon:({focused}) => 
                        focused ? (
                            <FontAwesome name="podcast" size={35} color="#61b15a" />
                        ) : (
                            <FontAwesome name="podcast" size={35} color="black" />
                        ) }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}
