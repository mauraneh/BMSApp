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
            <Tab.Navigator>
                <Tab.Screen 
                    name="home" 
                    component={Home} 
                    options={{ 
                        tabBarLabel: "Accueil", 
                        headerShown: false, 
                        tabBarLabelStyle: { color: "#fff" }, 
                        tabBarIcon:({focused}) => 
                        focused ? (
                            <Feather name="home" size={30} color="black" />
                        ) : (
                            <Entypo name="home" size={30} color="black" />
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
                            <MaterialCommunityIcons name="playlist-music" size={30} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="playlist-music-outline" size={30} color="black" />
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
                            <FontAwesome name="podcast" size={30} color="black" />
                        ) : (
                            <FontAwesome5 name="podcast" size={30} color="black" />
                        ) }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}
