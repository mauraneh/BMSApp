import React, { useEffect } from "react";
import { Audio } from "expo-av";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../src/Types";
import ImageAChanger from '../assets/images/layerGreen.png';
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slider } from "react-native-elements/dist/slider/Slider";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


type MusicPlayerProps = StackScreenProps<RootStackParamList, "MusicPlayer">;

const MusicPlayer: React.FC<MusicPlayerProps> = ({ route }) => {
  const { music } = route.params || { music: "" };

  useEffect(() => {
    const loadAudio = async () => {
      if (music) {
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: music },
            { shouldPlay: true }
          );
          // Faites quelque chose avec l'objet 'sound' si nécessaire
        } catch (error) {
          console.error("Erreur lors du chargement de l'élément audio:", error);
          // Gérer l'erreur de chargement audio
        }
      }
    };
    loadAudio();
  }, [music]);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={ImageAChanger} style={styles.imgContainer} />
      <View style={styles.infoSongs}>
                  <Text style={styles.songTitle}>
                    {/* {track.name} */}
                    Nom de la musique
                    </Text>
                  <Text style={styles.songArtist}>
                    {/* {track.artist} */}
                    By: Artiste de la musique
                    </Text>
                </View>
                <View>
                  <View style={styles.playerContainer}>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#61B15A"
                        maximumTrackTintColor="#F4F8EC"
                        thumbTintColor="#61B15A"
                        thumbTouchSize={{ width: 50, height: 50 }} // Augmente la taille de la zone tactile du pouce
                        thumbStyle={{ 
                          height: 20, 
                          width: 20, 
                          shadowColor: '#000',
                          shadowOffset: { width: -2, height: -2 },
                          shadowOpacity: 0.25,
                          shadowRadius: 3,
                          elevation: 10,

                        }} // Change la taille du pouce
                        trackStyle={{ 
                          height: 10, 
                          backgroundColor: '#E0E5EC',
                          shadowColor: '#000',
                          shadowOffset: { width: 2, height: 2 },
                          shadowOpacity: 0.15,
                          shadowRadius: 2,
                          elevation: 5,
                        }} // Change la hauteur de la piste           
                      />
                      <Text style={styles.songDuration}>
                      {/* {`${Math.floor(track.durationInSeconds / 60)}:${(
                        Math.floor(track.durationInSeconds) % 60
                      ).toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}`} */}
                      3:33
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
                      <TouchableOpacity style={styles.playerButton}>
                        <Text>
                          <AntDesign name="caretright" size={24} color="white" />
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text>
                          <AntDesign name="forward" size={20} color="grey" />
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text>
                          <Feather name="repeat" size={24} color="grey" />                        </Text>
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
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    width: 250,
    height: 250,
    borderRadius: 150,
    overflow: 'hidden',
  },
  infoSongs: {
    marginTop: 20,
    fontSize: 35,
    color: 'black',
    alignItems: "center",
    justifyContent: "center",
  },
  songTitle: {
    fontFamily: 'Alegreya',
    fontSize: 25,
    fontWeight: '400',
    color: '#000',
  },
  songArtist: {
    fontFamily: 'Alegreya',
    fontSize: 20,
    color: '#6C7172',
  },
  songDuration: {
    fontFamily: 'Alegreya',
    fontSize: 20,
    color: 'grey',
  },
  playerContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerButton: {
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#61B15A',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerButtons: {
    marginLeft: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },
  slider: {
    marginTop:20,
    width:260,
    height:40
  } ,
});
