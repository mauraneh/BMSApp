import * as React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  TouchableHighlightComponent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopNav from "../Components/topTabs";
import { ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAuth } from "../src/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";

type PlaylistProps = {};

const Playlist: React.FunctionComponent<PlaylistProps> = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [fontsLoaded] = useFonts({
    Alegreya: require("../assets/fonts/Alegreya-VariableFont_wght.ttf"),
  });
  const { accessToken } = useAuth();
  // Déclarez votre state à l'extérieur de votre fonction fetchPlaylists
  const [playlists, setPlaylists] = useState<{
    name: string;
    description: string;
    imagesUrl: string;
  }>();
  const [Tracks, setTrack] = useState<
    {
      id: string;
      name: string;
      images: string;
      artist: string;
      durationInSeconds: number;
      music: string;
    }[]
  >();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/playlists/37i9dQZF1EIf4njwtXx7O5",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const playlistData = response.data;
        const extractedData = {
          name: playlistData.name,
          description: playlistData.description,
          imagesUrl: playlistData.images.map((image: any) => image.url),
        };
        setPlaylists(extractedData);
        const tracksResp = playlistData.tracks.items;

        const tracks = tracksResp.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          images: item.track.album.images[0].url,
          artist: item.track.artists[0].name,
          durationInSeconds: item.track.duration_ms / 1000,
          music: item.track.preview_url,
        }));
        setTrack(tracks);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    if (accessToken) {
      fetchPlaylists();
    } else {
      console.error("Pas de token");
    }
  }, [accessToken]);
  const playSound = async (track: { music: string }) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.music },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded && status.isPlaying) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        }
      );

      setSound(newSound);
    } catch (error) {
      console.error("Erreur de lecture du son", error);
    }
  };
  const handleImagePress = async (track: { id: string; music: string }) => {
    try {
      if (selectedTrack === track.id) {
        if (sound) {
          await sound.stopAsync();
        }
        setSelectedTrack(null);
      } else {
        setSelectedTrack(track.id);
        await playSound(track);
      }
    } catch (error) {
      console.error("Erreur lors du traitement de la piste", error);
    }
  };

  return (
    <>
      <SafeAreaView>
        <TopNav />
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: playlists?.imagesUrl[0] }}
              style={styles.playlistContainer}
            >
              <Text style={styles.playlistName}>{playlists?.name}</Text>
              <Text style={styles.playlistDescription}>
                {playlists?.description}
              </Text>
              <TouchableOpacity
                style={styles.btnPlayNow}
                onPress={() => {
                  console.log("bouton ok");
                }}
              >
                <Text style={{ fontSize: 15, paddingRight: 10 }}>Play now</Text>
                <AntDesign name="play" size={18} color="black" />
              </TouchableOpacity>
            </ImageBackground>

            {Tracks?.map((track, index) => (
              <TouchableOpacity
                key={index}
                style={styles.songContainer}
                onPress={() => handleImagePress(track)}
              >
                <Animatable.View
                  animation={
                    selectedTrack === track.music ? "bounceIn" : undefined
                  }
                >
                  <View>
                    <Image
                      source={{ uri: track.images }}
                      style={styles.songImage}
                    />
                    {selectedTrack === track.music && (
                      <Animatable.View
                        animation={isPlaying ? "pulse" : undefined}
                        iterationCount="infinite"
                        style={styles.playIcon}
                      >
                        <AntDesign
                          name={isPlaying ? "pause" : "play"}
                          size={24}
                          color="white"
                        />
                      </Animatable.View>
                    )}
                  </View>
                  <View style={styles.infoSongs}>
                    <Text style={styles.songTitle}>{track.name}</Text>
                    <Text style={styles.songArtist}>{track.artist}</Text>
                  </View>
                  <View>
                    <Text style={styles.songDuration}>
                      <Text style={styles.songDuration}>
                        {`${Math.floor(track.durationInSeconds / 60)}:${(
                          Math.floor(track.durationInSeconds) % 60
                        ).toLocaleString("en-US", {
                          minimumIntegerDigits: 2,
                          useGrouping: false,
                        })}`}
                      </Text>
                    </Text>
                  </View>
                </Animatable.View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  playlistContainer: {
    width: 339,
    height: 195,
    borderRadius: 10,
    padding: 20,
    marginVertical: 30,
  },
  playlistName: {
    fontFamily: "Alegreya",
    color: "white",
    fontSize: 27,
    marginBottom: 8,
  },
  playlistDescription: {
    fontFamily: "Alegreya",
    width: 189,
    color: "white",
    fontSize: 15,
    marginBottom: 20,
  },
  songContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  infoSongs: {
    fontFamily: "Alegreya",
    width: 200,
    marginLeft: 20,
  },
  songTitle: {
    fontFamily: "Alegreya",
    fontSize: 20,
    fontWeight: "bold",
  },
  songArtist: {
    fontFamily: "Alegreya",
    fontSize: 16,
    color: "gray",
    fontWeight: "300",
  },
  songImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  songDuration: {
    color: "gray",
  },
  btnPlayNow: {
    width: 138,
    height: 39,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  playIcon: {
    position: "absolute",
  },
});

export default Playlist;
