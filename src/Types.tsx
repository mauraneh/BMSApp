// Types.d.ts
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Meditation: undefined;
  MusicPlayer: {
    music: string;
    artist: string;
    name: string;
    img: string;
    durationInSeconds: number;
  };
  Playlist: { playlistName?: string };
};

export type MusicPlayerProps = StackScreenProps<
  RootStackParamList,
  "MusicPlayer"
>;
export type PlaylistProps = StackScreenProps<RootStackParamList, "Playlist">;
