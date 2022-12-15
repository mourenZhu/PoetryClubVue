import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PoemAuthorRecord: AppRouteRecordRaw = {
  path: '/pa',
  name: 'PoemAuthor',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '古诗-作者',
    requiresAuth: true,
    icon: 'icon-book',
    order: 2,
  },
  children: [
    {
      path: '/poem/', // The midline path complies with SEO specifications
      name: 'PoemList',
      component: () => import('@/views/poem-author/poem-list/index.vue'),
      meta: {
        locale: '古诗',
        requiresAuth: true,
        roles: ['*', 'visitor'],
      },
    },
    {
      path: '/poem/:poemId', // The midline path complies with SEO specifications
      name: 'Poem',
      component: () => import('@/views/poem-author/poem/index.vue'),
      meta: {
        locale: '古诗详情',
        requiresAuth: true,
        roles: ['*', 'visitor'],
        hideInMenu: true,
      },
    },
    {
      path: '/author/', // The midline path complies with SEO specifications
      name: 'AuthorList',
      component: () => import('@/views/poem-author/author-list/index.vue'),
      meta: {
        locale: '诗人',
        requiresAuth: true,
        roles: ['*', 'visitor'],
      },
    },
  ],
};

export default PoemAuthorRecord;
