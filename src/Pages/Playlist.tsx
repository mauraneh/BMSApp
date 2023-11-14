import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function Playlist() {
    // const { data} = useGetPlaylist();

    return (
        <View style={styles.label}>
            <Text style={styles.mainTitle}>Zen playlists</Text>
            <Text style={styles.subtitle}>Nos playlists zen préférées</Text>
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
    label: {
        marginTop: 200,
        alignItems: "center",
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
});
