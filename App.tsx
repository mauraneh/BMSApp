import * as React from "react";
import { useState } from "react";
import "react-native-gesture-handler";

// Pages
import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import { BottomTabs } from "./Components/bottomTabs";
import { AuthProvider } from "./src/AuthContext";
import AuthSpotify from "./src/AuthSpotify";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AuthProvider>
      <AuthSpotify />
      {isLoading ? <Splash setIsLoading={setIsLoading} /> : <BottomTabs />}
    </AuthProvider>
  );
}
