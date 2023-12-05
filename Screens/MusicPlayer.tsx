import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../src/Types";

type MusicPlayerProps = StackScreenProps<RootStackParamList, "MusicPlayer">;

const MusicPlayer: React.FC<MusicPlayerProps> = ({ route }) => {
  const { music } = route.params || "";

  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: music },
        { shouldPlay: true }
      );
    })();
  }, [music]);
  return (
    <View>
      <Text>PlayScreen</Text>
    </View>
  );
};
export default MusicPlayer;
const styles = StyleSheet.create({});
