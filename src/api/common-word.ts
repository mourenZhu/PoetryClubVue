import axios from 'axios';

export interface CommonWordResVO {
  word: string;
  usageCount: number;
}

export function getRandomCommonWord() {
  return axios.get<CommonWordResVO>('/api/public/common_word/random');
}

export function getCommonWordTop(top = 200) {
  return axios.get<CommonWordResVO[]>(`/api/public/common_word/${top}`);
}
