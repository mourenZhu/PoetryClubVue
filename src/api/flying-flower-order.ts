import axios from 'axios';
import {
  FfoGameSentenceJudgeType,
  FfoVoteReqVO,
  FfoVoteType,
} from '@/types/ffo-types';
import { UserDto } from '@/types/user-dto';

// eslint-disable-next-line no-shadow
export enum FfoGamePoemType {
  ONLY_ANCIENTS_POEM = 'ONLY_ANCIENTS_POEM',
  ONLY_SELF_CREAT = 'ONLY_SELF_CREAT',
  ALL = 'ALL',
}

// eslint-disable-next-line no-shadow
export enum FfoStateType {
  PLAYING = 'PLAYING',
  WAITING = 'WAITING',
}

export interface FfoGameRoomResVO {
  id: string;
  name: string;
  keyword: string;
  maxPlayers: number;
  playerPreparationSecond: number;
  display: boolean;
  ffoGamePoemType: FfoGamePoemType;
  ffoStateType: FfoStateType;
  homeowner: UserDto;
  users: string[];
  remainingSeats: number;
}

export interface FfoGameRoomReqVO {
  name: string;
  maxPlayers: number;
  keyword: string;
  allowWordInAny: boolean;
  playerPreparationSecond: number;
  maxSentenceLength: number;
  constantSentenceLength: boolean;
  display: boolean;
  ffoGamePoemType: FfoGamePoemType;
}

const baseUrl = '/api/games/ffo';

export function queryFfoGameRooms(p?: any) {
  return axios.get(`${baseUrl}/room/`, { params: p });
}

export function createFfoGameRoom(ffoGameRoomReqVO: FfoGameRoomReqVO) {
  return axios.post<string>(`${baseUrl}/room`, ffoGameRoomReqVO);
}

export function enterFfoGameRoom(roomId: string) {
  return axios.post<boolean>(`${baseUrl}/room/${roomId}`);
}

export function leaveGameRoom() {
  return axios.delete<boolean>(`${baseUrl}/room`);
}

export function startGame() {
  return axios.post<boolean>(`${baseUrl}`);
}

export function postFfoVote(roomId: string, ffoVoteReqVO: FfoVoteReqVO) {
  return axios.post<boolean>(`${baseUrl}/${roomId}/vote`, ffoVoteReqVO);
}

export function listUserFfoGame(username: string, pNum: number, pSize: number) {
  return axios.get(`${baseUrl}/${username}/`, {
    params: { pageNum: pNum - 1, pageSize: pSize },
  });
}
export interface UserPublicResVo {
  username: string;
  nickname: string;
  avatar: string;
}
export interface FfoGameUserInfoResVo {
  id: string;
  userVo: UserPublicResVo;
  sequence: number;
  ranking: number;
}
export interface FfoGameUserVoteResVo {
  userVo: UserPublicResVo;
  ffoVoteType: FfoVoteType;
  createTime: string;
}
export interface FfoGameUserSentenceResVo {
  id: string;
  userVo: UserPublicResVo;
  sentence: string;
  poem: any;
  sentenceJudgeType: FfoGameSentenceJudgeType;
  userVotes: FfoGameUserVoteResVo[];
  createTime: string;
}
export interface FfoGameResVo {
  id: string;
  keyword: string;
  playerPreparationSecond: number;
  allowWordInAny: boolean;
  maxSentenceLength: number;
  constantSentenceLength: number;
  ffoGamePoemType: FfoGamePoemType;
  userInfos: FfoGameUserInfoResVo[];
  userSentences: FfoGameUserSentenceResVo[];
  createTime: string;
  endTime: string;
}
export function getFfo(ffoId: string) {
  return axios.get<FfoGameResVo>(`${baseUrl}/${ffoId}`);
}
