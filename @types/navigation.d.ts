import { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Startup: undefined;
  Home: undefined;
  Game: { category: string };
  Congratz: { points: number; category: string };
  Leaderboard: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type GameProps = StackScreenProps<ApplicationStackParamList, 'Game'>;
export type CongratzProps = StackScreenProps<
  ApplicationStackParamList,
  'Congratz'
>;
