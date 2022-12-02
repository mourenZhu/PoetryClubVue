import { UserDto } from '@/types/user-dto';
import {
  FfoGamePoemType,
  FfoGameSentenceJudgeType,
  FfoVoteType,
} from '@/types/ffo-types';

export interface FfoGameVoteDTO {
  user: UserDto;
  ffoVoteType: FfoVoteType;
  createTime: string;
}

export interface FfoGameSentenceDTO {
  user: UserDto;
  sentence: string;

  sentenceJudgeType: FfoGameSentenceJudgeType;
  userVotes: FfoGameVoteDTO[];
  createTime: string;
}

export interface FfoGame {
  roomId: string;
  maxPlayers: number;
  keyword: string;
  allowWordInAny: boolean;
  playerPreparationSecond: number;
  maxSentenceLength: number;
  constantSentenceLength: boolean;
  ffoGamePoemType: FfoGamePoemType;
  userSentences: FfoGameSentenceDTO[];
  homeowner: UserDto;
  users: UserDto[];
  playingUsers: UserDto[];
  ranking: UserDto[];
  createTime: string;
  endTime: string;
}
