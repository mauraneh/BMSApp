import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Credentials } from '../src/Credentials';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const code= Credentials();

const Podcast = () => {
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/browse/categories/meditation/playlists', {
                    headers: {
                        Authorization: `Bearer ${code.CLIENT_ID}:${code.CLIENT_SECRET}`,
                    },
                });
                setPodcasts(response.data.items);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };

        fetchPodcasts();
    }, []);

    return (
        <SafeAreaView>
            <Text>Podcast</Text>
        </SafeAreaView>
    );
};

export default Podcast;

