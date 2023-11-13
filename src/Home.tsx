import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons/faYinYang';
import { faCouch } from '@fortawesome/free-solid-svg-icons/faCouch';
import { faVihara } from '@fortawesome/free-solid-svg-icons/faVihara';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

const AppButton = ({ onPress, title, size, backgroundColor }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
        styles.appButtonContainer,
        size === "sm" && {
            paddingHorizontal: 8,
            paddingVertical: 6,
            elevation: 6
        },
        backgroundColor && { backgroundColor }
    ]}
    >
    <Text style={[styles.appButtonText, size === "sm" && { fontSize: 14 }]}>
        {title}
    </Text>
    </TouchableOpacity>
);

  TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

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
            <View style={styles.rectangle}>
                <Text>Méditation guidée</Text>
                <Text>Laissez vous guider et détentez-vous avec la méditation guidée ..</Text>
                <View style={styles.screenContainer}>
                    <AppButton title="Écoutez maintenant" size="sm" backgroundColor="#007bff" />
                </View>
            </View>
            <View  style={styles.rectangle}>
                <Text>Rectangle 2</Text>
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
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: "#f3f8ec",
        borderRadius: 20,
        height: 170,
        width: 339,
    },
    icon: {
        color: "white",
        padding: 2,
    },
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});