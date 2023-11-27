import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const BtnPlay = () => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => {console.log('bouton ok');}}>
            <Text style={styles.textBtn}>Écoutez</Text>
            <FontAwesomeIcon icon={faCirclePlay} style={styles.iconPlay} size={25}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
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
    textBtn: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'Roboto',
    },
    iconPlay: {
        marginLeft: 15,
        color: '#fff',
    },
});

export default BtnPlay;
