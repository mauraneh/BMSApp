import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../src/Types";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

type MusicPlayerProps = StackScreenProps<RootStackParamList, "MusicPlayer">;

const MusicPlayer: React.FC<MusicPlayerProps> = ({ route }) => {
  const { music, name, artist, img, durationInSeconds } = route.params || {
    music: "",
  };
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number | null>(null);
  // Nouvelle fonction pour mettre à jour la position lors du changement de la barre de progression
  const onSliderValueChange = async (value: number) => {
    if (sound) {
      // Mettre en pause la musique si elle est en cours de lecture
      if (isPlaying) {
        await sound.pauseAsync();
      }

      // Définir la nouvelle position
      await sound.setPositionAsync(value * 1000);
      setPosition(value);

      // Relancer la musique si elle était en cours de lecture
      if (isPlaying) {
        await sound.playAsync();
      }
    }
  };
  const onSliderSlidingComplete = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
      setPosition(value);

      // Vérifier si la musique est terminée et redémarrer si nécessaire
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.positionMillis === status.durationMillis) {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    }
  };
  useEffect(() => {
    const loadAudio = async () => {
      if (music) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: music },
            { shouldPlay: false }
          );
          setSound(sound);

          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              if (status.positionMillis !== undefined) {
                setPosition(status.positionMillis / 1000);
              }
              if (status.durationMillis !== undefined) {
                setDuration(status.durationMillis / 1000);
              }
              setIsPlaying(status.isPlaying);
              if (status.didJustFinish) {
                sound.setPositionAsync(0);
                setPosition(0);
              }
            }
          });

          // Charger le statut initial
          const initialStatus = await sound.getStatusAsync();
          if (initialStatus.isLoaded) {
            if (initialStatus.positionMillis !== undefined) {
              setPosition(initialStatus.positionMillis / 1000);
            }
            if (initialStatus.durationMillis !== undefined) {
              setDuration(initialStatus.durationMillis / 1000);
            }
            setIsPlaying(initialStatus.isPlaying);
          } else if (initialStatus.error) {
            console.error(
              "Erreur lors du chargement de l'élément audio :",
              initialStatus.error
            );
          }
        } catch (error) {
          console.error(
            "Erreur lors du chargement de l'élément audio :",
            error
          );
        }
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [music]);

  useEffect(() => {
    // Mettre à jour la position toutes les 500 ms
    const interval = setInterval(async () => {
      if (sound && isPlaying) {
        const status = await sound.getStatusAsync();

        // Vérifier si status est une instance de AVPlaybackStatus
        if ("positionMillis" in status && status.durationMillis !== undefined) {
          setPosition(status.positionMillis / 1000);
          setDuration(status.durationMillis / 1000);
        }
      }
    }, 0.5);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        if (position === duration) {
          await sound.setPositionAsync(0);
        }
        await sound.playAsync();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: img }} style={styles.imgContainer} />
      <View style={styles.infoSongs}>
        <Text style={styles.songTitle}>{name}</Text>
        <Text style={styles.songArtist}>{artist}</Text>
      </View>
      <View>
        <View style={styles.playerContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 1}
            minimumTrackTintColor="#61B15A"
            maximumTrackTintColor="#F4F8EC"
            thumbTintColor="#61B15A"
            thumbTouchSize={{ width: 50, height: 50 }}
            value={position}
            onValueChange={onSliderValueChange}
            onSlidingComplete={onSliderSlidingComplete}
          />

          <Text style={styles.songDuration}>
            {position !== null && duration !== null
              ? `${String(Math.floor(position / 60)).padStart(2, "0")}:${String(
                  Math.floor(position) % 60
                ).padStart(2, "0")} / ${String(
                  Math.floor(duration / 60)
                ).padStart(2, "0")}:${String(
                  Math.floor(duration) % 60
                ).padStart(2, "0")}`
              : "Loading..."}
          </Text>
          <View style={styles.playerButtons}>
            <TouchableOpacity>
              <Text>
                <FontAwesome name="random" size={20} color="grey" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                <AntDesign name="banckward" size={20} color="grey" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayback}>
              <Text>
                <FontAwesome
                  name={isPlaying ? "pause" : "play"}
                  size={20}
                  color="grey"
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                <AntDesign name="forward" size={20} color="grey" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                <Feather name="repeat" size={24} color="grey" />{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    width: 250,
    height: 250,
    borderRadius: 150,
    overflow: "hidden",
  },
  infoSongs: {
    marginTop: 20,
    fontSize: 35,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  songTitle: {
    fontFamily: "Alegreya",
    fontSize: 25,
    fontWeight: "400",
    color: "#000",
  },
  songArtist: {
    fontFamily: "Alegreya",
    fontSize: 20,
    color: "#6C7172",
  },
  songDuration: {
    fontFamily: "Alegreya",
    fontSize: 20,
    color: "grey",
  },
  playerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  playerButton: {
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#61B15A",
    justifyContent: "center",
    alignItems: "center",
  },
  playerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: Dimensions.get("screen").width,
  },
  slider: {
    marginTop: 20,
    width: 260,
    height: 40,
  },
});
