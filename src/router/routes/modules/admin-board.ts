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
      path: 'announcement-create',
      name: 'AnnouncementCreate',
      component: () =>
        import('@/views/admin-board/announcement-create/index.vue'),
      meta: {
        locale: '创建公告',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'announcement/:id/update',
      name: 'AnnouncementUpdate',
      component: () =>
        import('@/views/admin-board/announcement-update/index.vue'),
      meta: {
        locale: '修改公告',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'announcement-list',
      name: 'AnnouncementList',
      component: () =>
        import('@/views/admin-board/announcement-list/index.vue'),
      meta: {
        locale: '公告列表',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
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
      path: 'user-list',
      name: 'AdminUserList',
      component: () => import('@/views/admin-board/user-list/index.vue'),
      meta: {
        locale: '用户列表',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: ':username/setting',
      name: 'AdminUserSetting',
      component: () => import('@/views/admin-board/user-setting/index.vue'),
      meta: {
        locale: '用户设置',
        requiresAuth: true,
        roles: ['admin'],
        hideInMenu: true,
      },
    },
  ],
};

export default AdminBoard;
