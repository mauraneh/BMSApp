import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../src/AuthContext";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import GreenImage from "../assets/images/layerGreen.png";

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const Podcast = () => {
  const { accessToken } = useAuth();
  const [podcasts, setPodcasts] = useState<{ name: string; id: string; img: string, description: string; duration_ms: number; release_date: Date}[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/shows/34aR0t9IJBL6oHV4ioQ1l5/episodes",
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
      <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
        <View>
        <ImageBackground source={ GreenImage } style={styles.imageTitle}>
          <Text style={styles.textTitle}>Nos méditations guidées</Text>
          </ImageBackground>

            <View style={styles.cards}>
              {podcasts.map((podcast) => (
                <View style={styles.card}>
                    <TouchableOpacity key={podcast.id}>
                      <ImageBackground source={{uri: podcast.images[0].url}} resizeMode="cover" style={styles.imgCard}>
                      <Text style={styles.textPlay}>
                      <AntDesign name="play" size={60} color="white" />
                      </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.textNameCard}>{podcast.name}</Text>
                      <Text style={styles.textCard}>Relaxations et médiations guidées</Text>
                      <Text style={styles.textDescription}>
                        {podcast.description}
                      </Text>
                      <View style={styles.textInfos}>
                        <Text style={styles.textInfo}>{millisToMinutesAndSeconds(podcast.duration_ms)}</Text>
                        <Text style={styles.textInfo}>{podcast.release_date}</Text>
                      </View>
                    </View>
                </View>
              ))}
            </View>
            
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 'auto',
    width: 360,
    shadowOffset: { width: -2, height: 3 },
    shadowColor: "#171717",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textNameCard: {
    padding: 10,
    width: 200,
    textAlign: 'left',
    color: '#27432e',
    fontFamily: 'Alegreya',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textCard: {
    paddingLeft: 10,
    width: 200,
    textAlign: 'left',
    color: '#27432e',
    fontFamily: 'Alegreya',
    fontSize: 12,
  },
  textDescription: {
    padding: 10,
    width: 200,
    textAlign: 'left',
    color: '#27432e',
    fontFamily: 'Alegreya',
    fontSize: 10,
  },
  playCard: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  imgCard: {
    width: 120,
    height: 100,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: "#171717",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    
  },
  imageTitle: {
    width: Dimensions.get('window').width,
  },
  textTitle: {
    fontFamily: 'Alegreya',
    color: 'white',
    fontSize: 30,
    lineHeight: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textPlay: {
    paddingTop: 20,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.7,
  },
  textInfos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInfo: {
    width: 90,
    color: 'grey',
    fontFamily: 'Alegreya',
    fontSize: 15,
  },
});

export default Podcast;
