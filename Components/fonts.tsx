import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';

export default function FontLoader({ children }) {
    const [fontsLoaded] = useFonts({
    'Alegreya': require('../assets/fonts/Alegreya-VariableFont_wght.ttf'),
});

    if (!fontsLoaded) {
    return <View />;
    }

return children;
}