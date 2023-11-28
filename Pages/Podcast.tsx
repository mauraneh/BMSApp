import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../src/AuthContext";

const Podcast = () => {
  const { accessToken } = useAuth();
  const [podcasts, setPodcasts] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/shows/5juywvI2L9QItCNInbTHfr/episodes",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPodcasts(response.data.items);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    if (accessToken) {
      fetchPodcasts();
    } else {
      console.error("Pas de token");
    }
  }, [accessToken]);

  return (
    <SafeAreaView style={styles.container}>
      {podcasts.map((podcast) => (
        <View key={podcast.id} style={styles.showContainer}>
          <Text>{podcast.name}</Text>
          {/* Ajoutez d'autres informations sur l'émission selon vos besoins */}
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  showContainer: {
    marginVertical: 10,
  },
});

export default Podcast;
