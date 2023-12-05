import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    <SafeAreaView style={styles.tools}>
      <TouchableOpacity style={styles.moodBooster}>
        {podcasts.map((podcast) => (
          <View key={podcast.id} style={styles.rectangle}>
            <Text style={styles.textWrapper}>{podcast.name}</Text>
          </View>
        ))}
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tools: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  showContainer: {
    marginVertical: 10,
  },
  moodBooster: {
    height: 153,
    width: 117,
    // ... Autres styles spécifiques à cet élément ...
  },
  rectangle: {
    backgroundColor: "#adce74",
    borderRadius: 20,
    height: 115,
    // ... Autres styles spécifiques à cet élément ...
  },
  vector: {
    height: 101,
    // ... Autres styles spécifiques à cet élément ...
  },
  textWrapper: {
    color: "#ffffff",
    fontFamily: "Alegreya Sans-Medium",
    fontSize: 18,
    fontWeight: "500",
    // ... Autres styles spécifiques à cet élément ...
  },
});

export default Podcast;
