import * as React from 'react';
import { useState } from 'react';
import 'react-native-gesture-handler';

// Pages
import Splash from './Pages/Splash';
import Home from './Pages/Home';
import { BottomTabs } from './Components/bottomTabs';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return isLoading ? <Splash setIsLoading ={setIsLoading}/> : <BottomTabs />;
}