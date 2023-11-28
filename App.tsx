import * as React from "react";
import { useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

// Pages
import Splash from "./Pages/Splash";
import { BottomTabs } from "./Components/bottomTabs";
import FontLoader from "./Components/fonts";
import { AuthProvider } from "./src/AuthContext";
import AuthSpotify from "./src/AuthSpotify";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AuthProvider>
      <AuthSpotify />
      {isLoading ? (
        <Splash setIsLoading={setIsLoading} />
      ) : (
        <FontLoader>
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        </FontLoader>
      )}
    </AuthProvider>
  );
}
