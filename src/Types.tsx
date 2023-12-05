// Types.d.ts
import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
  MusicPlayer: { music: string };
};

export type MusicPlayerProps = StackScreenProps<
  RootStackParamList,
  "MusicPlayer"
>;
