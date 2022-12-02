import { UserDto } from '@/types/user-dto';
import { FfoGamePoemType } from '@/types/ffo-types';

export type FfoStateType = 'PLAYING' | 'WAITING';

export interface FfoGameRoom {
  id: string;
  name: string;
  maxPlayers: number;
  keyword: string;
  allowWordInAny: boolean;
  playerPreparationSecond: number;
  maxSentenceLength: number;
  constantSentenceLength: boolean;
  display: boolean;
  ffoStateType: FfoStateType;
  ffoGamePoemType: FfoGamePoemType;
  homeowner: UserDto;
  users: UserDto[];
}
