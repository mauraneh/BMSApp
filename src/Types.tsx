// Types.d.ts
import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
  MusicPlayer: { music: string };
  OnplayScreen: {
    /* votre type ici */
  };
};

export type MusicPlayerProps = StackScreenProps<
  RootStackParamList,
  "MusicPlayer"
>;
export type OnplayScreenProps = StackScreenProps<
  RootStackParamList,
  "OnplayScreen"
>;
