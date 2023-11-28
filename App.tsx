import * as React from 'react';
import { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

// Pages
import Splash from './Pages/Splash';
import { BottomTabs } from './Components/BottomTabs';
import FontLoader from './Components/Fonts';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return isLoading ? <Splash setIsLoading ={setIsLoading}/> : 
  <FontLoader>
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  </FontLoader>
}
