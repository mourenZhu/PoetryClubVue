import axios from 'axios';

const baseUrl = '/api/public/author';

export interface AuthorResVo {
  id: string;
  name: string;
  era: string;
  description: string;
}

export interface AuthorParams {
  name?: string;
  era?: string;
  description?: string;
  current: number;
  pageSize?: number;
}

export function listAuthor(params: AuthorParams) {
  return axios.get(`${baseUrl}/`, {
    params: {
      name: params.name,
      era: params.era,
      description: params.description,
      pageNum: params.current - 1,
      pageSize: params.pageSize,
    },
  });
}
