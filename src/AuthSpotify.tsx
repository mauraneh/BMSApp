import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useAuth } from "./AuthContext";

const { setToken } = useAuth();
const CLIENT_ID = "bb658016966947448cde48167fafb4ce";
const CLIENT_SECRET = "6bceb00adcec493fb80c42d4a01def5c";
const base64Credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const redirectUri = "exp://localhost:19000/--/auth/redirect";

const authOptions = {
  method: "post",
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: `grant_type=client_credentials&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`,
};

axios(authOptions)
  .then((response) => {
    const accessToken = response.data.access_token;
    if (!accessToken) {
      console.error("PB TOKEN");
    }
    setToken(accessToken);
  })
  .catch((error) => {
    console.error("Error getting access token:", error);
  });
