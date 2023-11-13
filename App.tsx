import * as React from 'react';
import { View } from 'react-native';
import { useState } from 'react';

// Pages
import Splash from './src/Splash';
import Home from './src/Home';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? <Splash setIsLoading ={setIsLoading}/> : <Home />;
}