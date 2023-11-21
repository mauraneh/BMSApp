import * as React from 'react';
import { View, StyleSheet, StatusBar, Text, ScrollView, Animated, Image, TouchableOpacity, TouchableHighlightComponent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNav from '../Components/topTabs';
import { ImageBackground } from 'react-native';
import backgroundImage from '../assets/layerGreen.png';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

type PlaylistProps = {};

type Track = {
    images: string;
    name: string;
    artist: string;
    durationInSeconds: number;
    };

const songs: Track[] = [
    {
        images: "https://picsum.photos/200/300",
        name: 'Painting Forest',
        artist: 'Artiste 1',
        durationInSeconds: 180, // Durée de la chanson en secondes
    },
    {
        images: "https://picsum.photos/200/900",
        name: 'Mountaineers',
        artist: 'Artiste 2',
        durationInSeconds: 240,
    },
    {
        images: "https://picsum.photos/200/700",
        name: 'Lovely Desert',
        artist: 'Artiste 3',
        durationInSeconds: 240,
    },
    {
        images: "https://picsum.photos/200/400",
        name: 'Titre de la chanson 4',
        artist: 'Artiste 4',
        durationInSeconds: 240,
    },
    {
        images: "https://picsum.photos/200/300",
        name: 'The Hill Side',
        artist: 'Artiste 4',
        durationInSeconds: 240,
    },
    {
        images: "https://picsum.photos/200/100",
        name: 'Calm and Storm',
        artist: 'Artiste 4',
        durationInSeconds: 240,
    },

];

const Playlist: React.FunctionComponent<PlaylistProps> = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [fontsLoaded] = useFonts({
        'Alegreya': require('../assets/fonts/Alegreya-VariableFont_wght.ttf'),
    });

    return (
        <>
            <SafeAreaView>
                <TopNav />
                <ScrollView
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                    scrollEventThrottle={16}
                >
                    <View style={styles.container}>
                        <ImageBackground source={backgroundImage} style={styles.playlistContainer}>
                            <Text style={styles.playlistName}>Relax Sound</Text>
                            <Text style={styles.playlistDescription}>Sometimes the most productive thing you can do is relax.</Text>
                            <TouchableOpacity style={styles.btnPlayNow} onPress={() => {console.log('bouton ok');}}>
                                <Text style={{fontSize: 15, paddingRight: 10}}>
                                    Play now 
                                </Text>
                                <AntDesign name="play" size={18} color="black" />
                            </TouchableOpacity>
                        </ImageBackground>

                        {songs.map((song, index) => (
                            <TouchableOpacity key={index} style={styles.songContainer}>
                                <View>
                                    <Image source={{ uri: song.images }} style={styles.songImage} />
                                </View>
                                <View style={styles.infoSongs}>
                                    <Text style={styles.songTitle}>{song.name}</Text>
                                    <Text style={styles.songArtist}>{song.artist}</Text>
                                </View>
                                <View>
                                    <Text style={styles.songDuration}>{Math.floor(song.durationInSeconds / 60)}:{song.durationInSeconds % 60}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playlistContainer: {
        width: 339,
        height: 195,
        borderRadius: 10,
        padding: 20,
        marginVertical: 30,
    },
    playlistName: {
        fontFamily: 'Alegreya',
        color: 'white',
        fontSize: 27,
        fontWeight: 500,
        marginBottom: 8,
    },
    playlistDescription: {
        fontFamily: 'Alegreya',
        width: 189,
        color: 'white',
        fontSize: 15,
        marginBottom: 20,
    },
    songContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    infoSongs: {
        fontFamily: 'Alegreya',
        width: 200,
        marginLeft: 20,
    },
    songTitle: {
        fontFamily: 'Alegreya',
        fontSize: 20,
        fontWeight: 'bold',
    },
    songArtist: {
        fontFamily: 'Alegreya',
        fontSize: 16,
        color: 'gray',
        fontWeight: '300',
    },
    songImage:{
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
    },
    songDuration: {
        color: 'gray',
    },
    btnPlayNow: {
        width: 138,
        height: 39,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

export default Playlist;