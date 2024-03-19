import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import LocalStorageKey from '@/common/constants/LocalStorageKey'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)
  if (!token && to.name !== 'login' && to.name != 'register') {
    next({ name: 'login' })
  } else next()
})

export default function (app: App) {
  app.use(router)
}

export { router }
