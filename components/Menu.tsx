import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYinYang } from '@fortawesome/free-solid-svg-icons/faYinYang';
import { faCouch } from '@fortawesome/free-solid-svg-icons/faCouch';
import { faVihara } from '@fortawesome/free-solid-svg-icons/faVihara';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function Home(){
    return(
        <NavigationContainer>
        <View style={styles.container}>
            <View style={styles.menu}>
                <FontAwesomeIcon icon={faBars} size={ 40 } />
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                <Image source={require('../assets/icon.png')}/>
                <FontAwesomeIcon icon={faUser} size={ 40 }/>
            </View>
        </View>
        </NavigationContainer>
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
    icon: {
        color: "#fff",
        padding: 2,
    },
    image: {
        width: 150,
        height: 70,
    }
});