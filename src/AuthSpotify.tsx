import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { encode as base64Encode } from "base-64";
import { View, Text } from "react-native";

const AuthSpotify = () => {
  const { setToken } = useAuth();
  const CLIENT_ID: string = "bb658016966947448cde48167fafb4ce";
  const CLIENT_SECRET: string = "6bceb00adcec493fb80c42d4a01def5c";
  const auth = base64Encode(`${CLIENT_ID}:${CLIENT_SECRET}`);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              Authorization: `Basic ${auth}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setToken(response.data.access_token);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    authenticate(); // Appeler la fonction d'authentification lors du montage
  }, [auth, setToken]);

  // Afficher un indicateur de chargement ou un message pendant l'authentification
  return (
    <View>
      <Text>Authentification en cours...</Text>
    </View>
  );
};

export default AuthSpotify;
