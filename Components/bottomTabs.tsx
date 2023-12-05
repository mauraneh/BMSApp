import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Pages/Home";
import Playlist from "../Pages/Playlist";
import Podcast from "../Pages/Podcast";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "react-query";

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export function BottomTabs() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            height: 110,
          },
          tabBarIconStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: "Accueil",
            headerShown: false,
            tabBarLabelStyle: { color: "#fff" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={30} color="#61b15a" />
              ) : (
                <Entypo name="home" size={30} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlist}
          options={{
            tabBarLabel: "Playlist",
            headerShown: false,
            tabBarLabelStyle: { color: "#fff" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="playlist-music"
                  size={30}
                  color="#61b15a"
                />
              ) : (
                <MaterialCommunityIcons
                  name="playlist-music-outline"
                  size={30}
                  color="black"
                />
              ),
          }}
        />
        <Tab.Screen
          name="podcast"
          component={Podcast}
          options={{
            tabBarLabel: "Podcast",
            headerShown: false,
            tabBarLabelStyle: { color: "#fff" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="podcast" size={30} color="#61b15a" />
              ) : (
                <FontAwesome name="podcast" size={30} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    </QueryClientProvider>
  );
}
