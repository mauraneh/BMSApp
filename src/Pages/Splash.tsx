import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
            source={require('../../assets/yogiste.json')}
            autoPlay
            loop={false}
            // speed={0.1}
            onAnimationFinish={() => setIsLoading(false)}
            />
            <Image source={require('../../assets/title.png')} style={styles.image}/>
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
    image: {
        position:"absolute",
        bottom: 150,
        width: 350,
        height: 60,
    },
});
