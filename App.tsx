import * as React from 'react';
import { useState } from 'react';
import 'react-native-gesture-handler';

// Pages
import Splash from './src/Pages/Splash';
import Home from './src/Pages/Home';
import { BottomTabs } from './src/Components/BottomTabs';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return isLoading ? <Splash setIsLoading ={setIsLoading}/> : <BottomTabs />;
}