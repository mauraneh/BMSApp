import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons/faYinYang';
import { faCouch } from '@fortawesome/free-solid-svg-icons/faCouch';
import { faVihara } from '@fortawesome/free-solid-svg-icons/faVihara';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay';


export default function Home(){
    return(
        <View style={styles.container}>
            <View style={styles.menu}>
                    <FontAwesomeIcon icon={faBars} size={ 40 } />
                    <Image source={require('../assets/icon.png')}/>
                    <FontAwesomeIcon icon={faUser} size={ 40 }/>
            </View>
            <View style={styles.label}>
                <Text style={styles.mainTitle}>Bienvenue petit lotus!</Text>
                <Text style={styles.subtitle}>Comment tu te sens aujourd'hui?</Text>
            </View>
            <View style={styles.sBox}>
                <View style={styles.rect}>
                    <FontAwesomeIcon icon={faYinYang} style={styles.icon} size={ 32 }/>
                    <Text style={styles.icon}>Calme</Text>
                </View>
                <View style={styles.rect}>
                    <FontAwesomeIcon icon={faCouch} style={styles.icon} size={ 32 }/>
                    <Text style={styles.icon}>Relax</Text>
                </View>
                <View style={styles.rect}>
                    <FontAwesomeIcon icon={faVihara} style={styles.icon} size={ 32 }/>
                    <Text style={styles.icon}>Focus</Text>
                </View>
                <View style={styles.rect}>
                    <FontAwesomeIcon icon={faBrain} style={styles.icon} size={ 32 } />
                    <Text style={styles.icon}>Anxieux</Text>
                </View>
            </View>
            <View style={styles.bBox}>

                <View style={styles.rectangle} {... styles.shadowBox}>
                    <Text style={styles.heading}>Méditation guidée</Text>
                        <View style={styles.rowFlex}>
                            <Text style={styles.bodyText}>Laissez vous guider et détentez-vous avec la méditation guidée ..</Text>
                            <Image source={require('../assets/mainBouddha.png')} style={styles.image}/>

                        </View>
                    <View style={styles.screenContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {console.log('bouton ok');}}>
                            <Text style={styles.textBtn} >Écoutez</Text>
                            <FontAwesomeIcon icon={faCirclePlay} style={styles.iconPlay} size={25}/>
                        </TouchableOpacity>                
                    </View>
                    
                </View>

                <View  style={styles.rectangle} {... styles.shadowBox}>
                    <Text style={styles.heading}>Yoga flow</Text>
                    <View style={styles.rowFlex}>
                        <Text style={styles.bodyText}>Une playlist Yoga Electronique pour se laisser transporter !</Text>
                        <Image source={require('../assets/zenMeditation.png')} style={styles.image}/>
                    </View>
                    <View style={styles.screenContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {console.log('bouton ok');}}>
                            <Text style={styles.textBtn} >Écoutez</Text>
                            <FontAwesomeIcon icon={faCirclePlay} style={styles.iconPlay} size={25}/>
                        </TouchableOpacity> 
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    menu: {
        marginTop: 100,
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        margin: 10,
    },
    mainTitle: {
        color: '#4e6c42',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    subtitle: {
        color: "#42484a",
        fontSize: 20,
        fontWeight: "100",
    },
    sBox: {
        flexDirection: "row",
        justifyContent: "center",
    },
    rect: {
        backgroundColor: "#adce74",
        borderRadius: 20,
        height: 65,
        width: 62,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    bBox: {
        height: 170,
        width: 339,
    },
    rectangle: {
        marginTop: 20,
        marginBottom: 6,
        backgroundColor: "#f3f8ec",
        borderRadius: 20,
        height: 150,
        width: 339,
    },
    shadowBox: {
        shadowOffset: {width: -2, height: 4},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        margin: 8,
        color: '#4e6c42',
        textTransform: 'uppercase',
        textAlign: "center",
    },
    icon: {
        color: "#fff",
        padding: 2,
    },
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    button: {
        height: 35,
        width: 135,
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
        width: 150,
        height: 70,
    },
    rowFlex: {
        flexDirection: "row",
    },
    bodyText: {
        paddingLeft: 15,
        textAlign: "left",
        width: 180,
    }
});