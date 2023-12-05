import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";
import { MusicPlayerProps } from "../src/Types";

const MusicPlayer: React.FC<MusicPlayerProps> = ({ route }) => {
  const { music } = route.params || { music: "" }; // Assurez-vous que music est toujours défini

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
    <View>
      <Text>PlayScreen</Text>
    </View>
  );
};

export default MusicPlayer;
