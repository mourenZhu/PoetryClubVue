import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { RoleType, UserState } from '@/store/modules/user/types';
import { number } from '@intlify/core-base';
import qs from 'query-string';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface UserResVO {
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  roles: RoleType[];
}

const baseUrl = '/api/user';
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/auth/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/auth/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function getUser(username: string) {
  return axios.get<UserResVO>(`${baseUrl}/${username}`);
}

export interface UserParams {
  username?: string;
  nickname?: string;
  email?: string;
  pageNum: number;
  pageSize?: number;
}
export function listUser(params: UserParams) {
  return axios.get(`${baseUrl}/`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
