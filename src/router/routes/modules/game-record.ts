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
      component: () => import('@/views/game-record/ffo-list/index.vue'),
      meta: {
        locale: '飞花令记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/ffo/:ffoId', // The midline path complies with SEO specifications
      name: 'FfoDetail',
      component: () =>
        import('@/views/game-record/ffo-list/ffo-detail/index.vue'),
      meta: {
        locale: '飞花令详细信息',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default gameRecord;
