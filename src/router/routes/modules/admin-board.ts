import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const AdminBoard: AppRouteRecordRaw = {
  path: '/admin-board',
  name: 'adminBoard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '管理员面板',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'ffo-list',
      name: 'AdminFfoList',
      component: () => import('@/views/admin-board/ffo-list/index.vue'),
      meta: {
        locale: '飞花令列表',
        requiresAuth: true,
        roles: ['admin'],
      },
    },

    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default AdminBoard;
