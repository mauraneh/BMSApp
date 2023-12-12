import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native";
import { ImageBackground } from "react-native";
import GreenImage from "../assets/images/layerGreen.png";
import YoutubePlayer from 'react-native-youtube-iframe';

const Podcast = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
        <ImageBackground source={ GreenImage } style={styles.imageTitle}>
          <Text style={styles.textTitle}>Nos méditations guidées</Text>
        </ImageBackground>
        
        {/* How to meditate */}
        <View style={styles.card}>
        <Text style={styles.textCard}>How to Meditate | Master Sri Avinash 💛</Text>
        <YoutubePlayer
            height={200}
            width={350}
            play={false}
            videoId={'7pTuaNOrEF4?si=HvTaTLtc-cZdQobD'}
          />
        </View>

        {/* Throat Chakra */}
        <View style={styles.card}>
          <Text style={styles.textCard}>Throat Chakra - Remove All Blockages 💚</Text>
          <YoutubePlayer
              height={200}
              width={350}
              play={false}
              videoId={'RY52DNjDmsU?si=4iDIByIAPAgThS4b'}
            />
        </View>

        {/* Third Eye Opening */}
        <View style={styles.card}>
          <Text style={styles.textCard}>The Ultimate Third Eye Opening Meditation 💜</Text>
          <YoutubePlayer
              height={200}
              width={350}
              play={false}
              videoId={'rG-7njQS3Kk?si=-SUUuoLII248gzVq'}
            />
        </View>

        {/* Crown Chakra */}
        <View style={styles.card}>
          <Text style={styles.textCard}>Crown Chakra Healing & Awakening 🤍</Text>
          <YoutubePlayer
              height={200}
              width={350}
              play={false}
              videoId={'rG-7njQS3Kk?si=KKbXoKNPeaX04l5-'}
            />
        </View>

          {/*  Navel Chakra Healing */}
          <View style={styles.card}>
          <Text style={styles.textCard}>Amazing Navel Chakra Healing Transmission 💙</Text>
          <YoutubePlayer
              height={200}
              width={350}
              play={false}
              videoId={'/L6myoVSS83Q?si=YnbO-BHgAX-DQImC'}
            />
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
  card: {
    margin: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 6,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowOffset: { width: -4, height: 6 },
    shadowColor: "#4e6c42",
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  textCard: {
    padding: 10,
    textAlign: 'center',
    color: '#27432e',
    fontFamily: 'Alegreya',
    fontSize: 20,
  },
  imageTitle: {
    width: Dimensions.get("window").width,
  },
  textTitle: {
    fontFamily: "Alegreya",
    color: "white",
    fontSize: 30,
    lineHeight: 100,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Podcast;
