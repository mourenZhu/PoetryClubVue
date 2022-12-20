import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const HOME: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'HOME',
    icon: 'icon-home',
    requiresAuth: false,
    order: 0,
    roles: ['*', 'visitor'],
  },
  children: [
    {
      path: 'announcement',
      name: 'Announcement',
      component: () => import('@/views/home/announcement/index.vue'),
      meta: {
        locale: '公告',
        requiresAuth: false,
        roles: ['*', 'visitor'],
      },
    },
    {
      path: 'games',
      name: 'Games',
      component: () => import('@/views/home/games/index.vue'),
      meta: {
        locale: '游戏列表',
        requiresAuth: false,
        roles: ['*', 'visitor'],
      },
    },
  ],
};

export default HOME;
