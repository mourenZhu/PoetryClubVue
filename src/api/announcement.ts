import axios from 'axios';
import qs from 'query-string';

const baseUrl = '/api/public/announcement';

export interface AnnouncementPostVo {
  title: string;
  content: string;
}

export interface AnnouncementPutVo {
  id: string;
  title: string;
  content: string;
}

export interface AnnouncementResVo {
  id: string;
  title: string;
  content: string;
  createTime: string;
}

export interface AnnouncementTitleResVo {
  id: string;
  title: string;
  createTime: string;
  updateTime: string;
}

export function getAnnouncement(id: string) {
  return axios.get(`${baseUrl}/${id}`);
}

export interface PageTitleParams {
  title?: string;
  content?: string;
  pageNum: number;
  pageSize?: number;
}

export function pageTitleVo(params: PageTitleParams) {
  return axios.get(`${baseUrl}/title/`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function postAnnouncement(data: AnnouncementPostVo) {
  return axios.post(`${baseUrl}`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function putAnnouncement(data: AnnouncementPutVo) {
  return axios.put(`${baseUrl}/${data.id}`, data);
}

export function delAnnouncement(id: string) {
  return axios.delete(`${baseUrl}/${id}`);
}
