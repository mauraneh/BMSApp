import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons/faYinYang';
import { faCouch } from '@fortawesome/free-solid-svg-icons/faCouch';
import { faVihara } from '@fortawesome/free-solid-svg-icons/faVihara';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay';
import { useNavigationContainerRef } from '@react-navigation/native';
import TopNav from '../Components/topTabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';

const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Bonjour";
    } else if (currentTime < 16) {
      return "Bon après-midi";
    } else {
      return "Bonsoir";
    }
  };

export default function Home(){
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../assets/fonts/Alegreya-VariableFont_wght.ttf'),
    });

    const navigationRef = useNavigationContainerRef();
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <TopNav/>
            <View style={styles.label}>
                <Text style={styles.mainTitle}>Bienvenue petit lotus!</Text>
                <Text style={styles.subtitle}>Comment tu te sens aujourd'hui?</Text>
            </View>

            <View style={styles.sBox}>
                <TouchableOpacity style={styles.rect}>
                    <FontAwesomeIcon icon={faYinYang} style={styles.icon} size={ 32 }/>
                    <Text style={styles.icon}>Calme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rect}>
                    <FontAwesomeIcon icon={faCouch} style={styles.icon} size={ 32 }/>
                    <Text style={styles.icon}>Relax</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rect}>
                    <FontAwesomeIcon icon={faVihara} style={styles.icon} size={ 32 }/>
                    <Text style={styles.icon}>Focus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rect}>
                    <FontAwesomeIcon icon={faBrain} style={styles.icon} size={ 32 } />
                    <Text style={styles.icon}>Anxieux</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bBox}>
        {/* Méditation 101 */}
                <View  style={styles.rectangle} {... styles.shadowBox}>
                    <View style={styles.rowFlex}>
                        <View>
                            <Text style={styles.heading}>Méditation 101</Text>
                            <Text style={styles.bodyText}>Laissez vous guider et détentez-vous avec la méditation guidée ..</Text>
                            <TouchableOpacity style={styles.button} onPress={() => {console.log('bouton ok');}}>
                                <Text style={styles.textBtn} >Écoutez</Text>
                                <FontAwesomeIcon icon={faCirclePlay} style={styles.iconPlay} size={25}/>
                            </TouchableOpacity> 
                        </View>
                        <View>
                            <Image source={require('../assets/mainBouddha.png')} style={styles.image}/>
                        </View>
                    </View>
                </View>
        {/* Yoga flow */}
                <View  style={styles.rectangle} {... styles.shadowBox}>
                    <View style={styles.rowFlex}>
                        <View>
                            <Text style={styles.heading}>Yoga flow</Text>
                            <Text style={styles.bodyText}>Une playlist Yoga Electronique pour se laisser transporter !</Text>
                            <TouchableOpacity style={styles.button} onPress={() => {console.log('bouton ok');}}>
                                <Text style={styles.textBtn} >Écoutez</Text>
                                <FontAwesomeIcon icon={faCirclePlay} style={styles.iconPlay} size={25}/>
                            </TouchableOpacity> 
                        </View>
                        <View>
                            <Image source={require('../assets/zenMeditation.png')} style={styles.image}/>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    label: {
        margin: 20,
    },
    mainTitle: {
        fontFamily: 'Alegreya',
        color: '#4e6c42',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    subtitle: {
        fontFamily: 'Alegreya',
        marginVertical: 10,
        color: "#42484a",
        fontSize: 20,
        fontWeight: "100",
    },
    sBox: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    rect: {
        backgroundColor: "#adce74",
        borderRadius: 20,
        height: 65,
        width: 62,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        shadowOffset: {width: 1, height: 3},
        shadowColor: '#171717',
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    bBox: {
        alignItems: "center",
    },
    rectangle: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 6,
        backgroundColor: "#f3f8ec",
        borderRadius: 20,
        height: 160,
        width: 339,
    },
    shadowBox: {
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    heading: {
        fontFamily: 'Alegreya',
        fontSize: 18,
        fontWeight: '500',
        margin: 8,
        color: '#4c9145',
        textTransform: 'uppercase',
        textAlign: "center",
    },
    icon: {
        fontFamily: 'Alegreya',
        color: "#fff",
        padding: 2,
    },
    button: {
        alignSelf: "center",
        height: 35,
        width: 135,
        margin: 15,
        borderRadius: 10,
        backgroundColor: "#61b15a",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    textBtn :{
        fontFamily: 'Alegreya',
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    iconPlay :{
        marginLeft: 15,
        color: '#fff',
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 70,
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyText: {
        fontFamily: 'Alegreya',
        color: '#42484a',
        paddingLeft: 15,
        width: 180,
    }
});