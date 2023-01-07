import axios from 'axios';

export interface UserRegisterVO {
  nickname: string;
  username: string;
  email: string;
  verificationCode: string;
  password: string;
}

export function register(data: UserRegisterVO) {
  return axios.post(`/api/register`, data);
}
