import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const GAMES: AppRouteRecordRaw = {
  path: '/games',
  name: 'games',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '游戏列表',
    icon: 'icon-apps',
    requiresAuth: false,
    order: 8,
    roles: ['*'],
  },
  children: [
    {
      path: 'ffo-hall',
      name: 'FfoHall',
      component: () =>
        import('@/views/games/flying-flower-order/hall/index.vue'),
      meta: {
        locale: '飞花令',
        requiresAuth: true,
        roles: ['*'],
        hideChildrenInMenu: true,
      },
    },
    {
      path: 'ffo/:roomId',
      name: 'ffoGameRoom',
      component: () =>
        import('@/views/games/flying-flower-order/game-room/index.vue'),
      meta: {
        locale: '游戏房间',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default GAMES;
