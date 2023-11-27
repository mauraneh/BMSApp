import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import LottieView from 'lottie-react-native';

interface SplashProps{
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Splash({setIsLoading}:SplashProps): JSX.Element
{
    return (
        <View style={styles.container}>
            <LottieView 
            source={require('../assets/lotus.json')}
            autoPlay
            loop={false}
            // speed={0.1}
            onAnimationFinish={() => setIsLoading(false)}
            />
            <Text style={styles.text}>Body, Mind & Spirit</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f8ec',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        marginTop: 100,
        fontSize: 40,
        color: 'lightblue',
    },
});
