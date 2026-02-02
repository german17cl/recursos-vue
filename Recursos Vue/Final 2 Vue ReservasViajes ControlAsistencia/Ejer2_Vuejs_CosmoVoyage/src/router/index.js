import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/destinos',
      name: 'destinos',
      component: () => import('../views/DestinosView.vue'),
    },
    {
      path: '/reserva',
      name: 'reserva',
      component: () => import('../views/ReservaView.vue'),
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/ReservasConfirmadas.vue'),
      meta: { title: 'Mis Reservas' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
