import axios from 'axios';
import { FfoVoteReqVO } from '@/types/ffo-types';
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

const baseUrl = '/api/user/games/ffo';

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
