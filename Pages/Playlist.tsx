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
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useAuth } from "../src/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlaylistProps } from "../src/Types";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList } from "../src/Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator<RootStackParamList>();

const Playlist: React.FC<PlaylistProps> = ({ navigation, route }) => {
  const { playlistName } = route.params ?? { playlistName: "" };
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
  const [currentPlaylistName, setCurrentPlaylistName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Vérifiez si les données sont en cache
        const cachedDataString = await AsyncStorage.getItem("cachedPlaylists");
        if (cachedDataString) {
          const cachedData = JSON.parse(cachedDataString);

          if (playlistName && playlistName.trim() !== "") {
            const playlistFromCache = cachedData.playlists;
            const track = cachedData.tracks;

            // Mise à jour du traitement de playlistName après la vérification des données en cache
            if (playlistFromCache.id === playlistName) {
              // Si le nom de la playlist dans le cache correspond à playlistName, utilisez-le
              setPlaylists(playlistFromCache);
              setTrack(track);
              return;
            } else {
              setPlaylists(cachedData.playlists);
              setTrack(cachedData.tracks);
              // Mettez à jour le currentPlaylistName pour effectuer la requête API correcte
              setCurrentPlaylistName(playlistFromCache.id);
            }
          }

          let retryCount = 5; // Nombre de tentatives de réessai
          let success = false;

          while (retryCount > 0 && !success) {
            try {
              let playlistEndpoint =
                "https://api.spotify.com/v1/playlists/37i9dQZF1EIf4njwtXx7O5";

              if (playlistName && playlistName.trim() !== "") {
                playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistName}`;
              }

              const response = await axios.get(playlistEndpoint, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });

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

              // Stockez les données en cache
              const dataToCache = { playlists: extractedData, tracks: tracks };
              await AsyncStorage.setItem(
                "cachedPlaylists",
                JSON.stringify(dataToCache)
              );

              success = true;
            } catch (error) {
              if (
                axios.isAxiosError(error) && // Vérifier si c'est une erreur Axios
                error.response && // Vérifier si la réponse existe
                error.response.status === 429
              ) {
                // Attendez un certain temps avant de réessayer
                await new Promise((resolve) => setTimeout(resolve, 1000));
                retryCount--;
              } else {
                break; // Sortir de la boucle en cas d'autres erreurs
              }
            }
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données en cache :",
          error
        );
      }
    };
    if (accessToken) {
      fetchPlaylists();
    } else {
      console.error("Pas de token");
    }
  }, [accessToken]);

  return (
      <SafeAreaView style={styles.bg}>
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
                onPress={() => {
                  navigation.navigate("MusicPlayer", {
                    music: track.music,
                    artist: track.artist,
                    name: track.name,
                    img: track.images,
                    durationInSeconds: track.durationInSeconds,
                  });
                }}
              >
                <View>
                  <Image
                    source={{ uri: track.images }}
                    style={styles.songImage}
                  />
                  {selectedTrack === track.music && (
                    <Animatable.View
                      iterationCount="infinite"
                      style={styles.playIcon}
                    >
                      <AntDesign size={24} color="white" />
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
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    height: Dimensions.get("screen").height,
    backgroundColor: "#fff",
  },
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
