import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const gameRecord: AppRouteRecordRaw = {
  path: '/game-record',
  name: 'GameRecord',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '游戏记录',
    requiresAuth: true,
    icon: 'icon-list',
    order: 9,
  },
  children: [
    {
      path: 'ffo-list', // The midline path complies with SEO specifications
      name: 'FfoList',
      component: () => import('@/views/game-record/ffo/index.vue'),
      meta: {
        locale: '飞花令记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: 'menu.list.cardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default gameRecord;
