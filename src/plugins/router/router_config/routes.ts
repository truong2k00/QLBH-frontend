export const router = [
  {
    path: 'dashboard',
    component: () => import('@/pages/dashboard.vue'),
  },
  {
    path: 'account-settings',
    component: () => import('@/pages/account-settings.vue'),
  },
  {
    path: 'typography',
    component: () => import('@/pages/typography.vue'),
  },
  {
    path: 'icons',
    component: () => import('@/pages/icons.vue'),
  },
  {
    path: 'cards',
    component: () => import('@/pages/cards.vue'),
  },
  {
    path: 'tables',
    component: () => import('@/pages/tables.vue'),
  },
  {
    path: 'form-layouts',
    component: () => import('@/pages/form-layouts.vue'),
  },
  {
    path: 'product',
    name: 'Product',
    meta: {
      pageName: 'Sản phẩm',
    },
    component: () => import('@/pages/Tables/product/index.vue'),
  },
  {
    path: 'account-settings',
    component: () => import('@/pages/account-settings.vue'),
  },
  {
    path: 'typography',
    component: () => import('@/pages/typography.vue'),
  },
  {
    path: 'icons',
    component: () => import('@/pages/icons.vue'),
  },
  {
    path: 'cards',
    component: () => import('@/pages/cards.vue'),
  },
  {
    path: 'tables',
    component: () => import('@/pages/tables.vue'),
  },
  {
    path: 'form-layouts',
    component: () => import('@/pages/form-layouts.vue'),
  },
]
