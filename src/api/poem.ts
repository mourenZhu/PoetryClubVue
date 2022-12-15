import { AuthorResVo } from '@/api/author';
import axios from 'axios';
import qs from 'query-string';

const baseUrl = '/api/public/poem';

export type PoemType =
  | 'FIVE_CHARACTER_RHYTHM_POEM'
  | 'FIVE_CHARACTER_LONG_RHYTHM_POEM'
  | 'SIX_CHARACTER_RHYTHM_POEM'
  | 'SIX_CHARACTER_LONG_RHYTHM_POEM'
  | 'SEVEN_CHARACTER_RHYTHM_POEM'
  | 'SEVEN_CHARACTER_LONG_RHYTHM_POEM'
  | 'FIVE_CHARACTER_QUATRAIN'
  | 'SIX_CHARACTER_QUATRAIN'
  | 'SEVEN_CHARACTER_QUATRAIN'
  | 'UNKNOWN';

export interface PoemResVo {
  id: string;
  author: AuthorResVo;
  title: string;
  content: string;
  poemType: PoemType;
  tags: string[];
}

export interface PoemParams {
  author?: string;
  era?: string;
  title?: string;
  content?: string;
  poemType?: PoemType;
  tags?: string[];
  current: number;
  pageSize?: number;
}

export function listPoem(params: PoemParams) {
  return axios.get(`${baseUrl}/`, {
    params: {
      author: params.author,
      era: params.era,
      title: params.title,
      content: params.content,
      poemType: params.poemType,
      tags: params.tags,
      pageNum: params.current - 1,
      pageSize: params.pageSize,
    },
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getPoem(id: string) {
  return axios.get(`${baseUrl}/${id}`);
}
