import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('../views/PeopleView.vue')
    },
    {
      path: '/planets',
      name: 'planets',
      component: () => import('../views/PlanetsView.vue')
    },
    {
      path: '/starships',
      name: 'starships',
      component: () => import('../views/StarshipsView.vue')
    }
  ]
})

export default router
