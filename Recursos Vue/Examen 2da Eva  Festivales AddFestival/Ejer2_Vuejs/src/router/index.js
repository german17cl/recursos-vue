import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '../views/Bienvenida.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bienvenida',
      component: Bienvenida
    },
    {
      path: '/festivales',
      name: 'festivales',
      component: () => import('../views/TodosFestivales.vue')
    },
    {
      path: '/anadir-festival',
      name: 'anadirFestival',
      component: () => import('../views/AnadirFestival.vue')
    },
    {
      path: '/festivales-genero',
      name: 'festivalesGenero',
      component: () => import('../views/FestivalesGenero.vue')
    },
    {
      path: '/festival/:nombre',
      name: 'festivaldetalle',
      component: () => import('../views/DetalleFestival.vue')
    }
  ]
})

export default router
