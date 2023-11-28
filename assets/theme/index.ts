import {createTheme, createBox, createText} from '@shopify/restyle';
import Animated from 'react-native-reanimated';
import FontLoader from '../../Components/Fonts';
import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
    'Alegreya': require('../fonts/static/Alegreya-Regular.ttf'),
});

const palette = {
  greenSuperLight: '#f4f8ec',
  greenLight: '#d9dfa7',
  greenPrimary: '#4c9145',
  greenDark: '#4e6c42',

  white: '#ffffff',
  black: '#0B0B0B',
  egg: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.greenSuperLight,
    smallCardBackground: palette.greenLight,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const AnimatedBox = Animated.createAnimatedComponent(Box);

export type Theme = typeof theme;
export default theme;
