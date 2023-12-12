import React, {useEffect, useRef} from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import LottieView from 'lottie-react-native';

interface SplashProps{
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Splash({setIsLoading}:SplashProps): JSX.Element
{
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        ).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
        <Animated.Text style={{...styles.text, opacity: fadeAnim}}>Body, Mind & Spirit</Animated.Text>
            <LottieView
                style={styles.lottie}
                source={require('../assets/yogiste.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => setIsLoading(false)}
            />
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
    lottie: {
        justifyContent: 'flex-end',
        width: 400,
        height: 400,
    },
    text: {
        fontFamily: 'Verdana',
        flex: 1,
        fontWeight: '200',
        marginTop: 100,
        fontSize: 60,
        color: '#adce74',
    },
});
