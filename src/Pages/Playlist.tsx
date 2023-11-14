import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dispatch, SetStateAction } from 'react';


export default function Playlist()
{
    return (
        <View style={styles.container}>
            <Text> Playlist</Text>
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
});
