import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import {Picker} from "@react-native-picker/picker";
import { ImageBackground } from "react-native";
import backgroundImage from '../assets/images/layerGreen.png';
import { Audio } from 'expo-av';

const sound = new Audio.Sound();


const screen = Dimensions.get("window");

const formatNumber = (number: number) => `0${number}` . slice(-2);

const getRemaining = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)}
}

const createArray = (length: number) => {
  const arr = [];
  let i = 0;
  while(i < length){
    arr.push(i.toString());
    i += 1;
  }
  return arr;
}

const AVAILABLE_MINUTES = createArray(120);

export default class App extends React.Component{
  state = {
    remainingSeconds: 0,
    isRunning: false,
    selectedMinutes: "10",
    selectedSeconds: "0",
    timer: 0,
  }

  interval = null;

  componentDidUpdate = async (prevProp: any, prevState: { remainingSeconds: number; }) => {
    if(this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0){
      this.stop();
    }
  }

  componentWillUnmount() {
    if(this.interval){
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    // Charger le son
    this.loadSound();
  }

  loadSound = async () => {
    try {
      await sound.loadAsync(require('../assets/sounds/bol-sound.mp3'));
    } catch (error) {
      console.log('Erreur lors du chargement du son', error);
    }
  }

  start = () => {
    this.setState(state => ({
      remainingSeconds: 
        parseInt(state.selectedMinutes, 10) * 60 +
        parseInt(state.selectedSeconds, 30),
        isRunning: true
    }));
    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  }

  stop = async () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 5,
      isRunning: false
    });
      // Jouer le son
      try {
        await sound.playAsync();
      } catch (error) {
        console.log('Erreur lors de la lecture du son', error);
      }
  }

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={itemValue => {
          this.setState({selectedMinutes: itemValue});
        }}
        mode="dropdown"
      > 
        {
          AVAILABLE_MINUTES.map(value => (
            <Picker.Item key={value} label={value} value={value} />
          ))
        }
      </Picker>
      <Text style={styles.pickerItem}>minutes</Text>
    </View>
  );

  render(){
    const {minutes, seconds} = getRemaining(this.state.remainingSeconds);
    return(
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.titleBox}>
          <Text style={styles.title}>Timer Méditation</Text>
        </ImageBackground>

        <StatusBar barStyle="light-content" />
        {
          this.state.isRunning ? (
            <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
          ) : (
            this.renderPickers()
          )
        }
        {
          this.state.isRunning ? (
            <TouchableOpacity 
              onPress={this.stop}
              style={[styles.button, styles.buttonStop]}
              >
                <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
              </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={this.start}
              style={styles.button}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    width: screen.width,
    marginVertical: 0,
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: 'Alegreya',
    color: '#fff',
    fontSize: 30,
    letterSpacing: 2,
    padding: 40,
  },
  button: {
    borderWidth: 10,
    borderColor: "#afd2a0",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonStop: {
    borderColor: "#FF851B"
  },
  buttonText: {
    fontFamily: 'Alegreya',
    fontSize: 45,
    color: "#afd2a0"
  },
  buttonTextStop: {
    fontFamily: 'Alegreya',
    color: "#FF851B"
  },
  timerText: {
    margin: 54,
    fontFamily: 'Alegreya',
    color: "#4c9145",
    fontSize: 80
  },
  picker: {
    flex: 1,
    maxWidth: 100,
    color: "#4c9145",
    backgroundColor: "#fff",
  },
  pickerItem: {
    color: "#4c9145",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});