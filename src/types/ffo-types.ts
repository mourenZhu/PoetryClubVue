import { UserDto } from '@/types/user-dto';

export type FfoGamePoemType = 'ONLY_ANCIENTS_POEM' | 'ONLY_SELF_CREAT' | 'ALL';

export type FfoGameSentenceJudgeType =
  | 'SUCCESS'
  | 'NULL_CONTENT'
  | 'LENGTH_NOT_MATCH'
  | 'NO_KEYWORD'
  | 'KEYWORD_NOT_IN_CORRECT_POSITION'
  | 'DUPLICATE_CONTENT'
  | 'ONLY_ANCIENTS_POEM_BUT_NOT_FIND'
  | 'ONLY_SELF_CREAT_BUT_FIND'
  | 'WAITING_USERS_VOTE'
  | 'VOTE_FAILED';

export type FfoVoteType = 'FAVOR' | 'OPPOSE' | 'ABSTAIN';

export interface FfoNextOutputVO {
  nextUser: UserDto;
  nextEndTime: string;
}

export interface FfoGameOverOutputVO {
  ranking: UserDto[];
  endTime: string;
}

export interface FfoVoteOutputVO {
  currentUser: UserDto;
  currentSentence: string;
  speakingTime: string;
  endTime: string;
}

export interface FfoVoteReqVO {
  ffoVoteType: FfoVoteType;
}
