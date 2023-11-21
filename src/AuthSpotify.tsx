import { View, Text, Button } from 'react-native'
import React from 'react'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Credentials } from './Credentials';
import { useAuthRequest } from 'expo-auth-session';

const code= Credentials();

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function AuthSpotify() {
    const [request, response, promptAsync] = useAuthRequest(
    {
        clientId: code.CLIENT_ID,
        scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public"
        ],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
        usePKCE: false,
        redirectUri: "exp://localhost:19002/--/spotify-auth-callback",
    },
    discovery
    );

    React.useEffect(() => {
    if (response?.type === 'success') {
        const { code } = response.params;
    }
    }, [response]);

    return (
    <Button
        disabled={!request}
        title="Login"
        onPress={() => {
        promptAsync();
        }}
    />
    );
}