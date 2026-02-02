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
      path: '/todosServicios',
      name: 'todosServicios',
      component: () => import('../views/TodosServicios.vue')
    },
    {
      path: '/serviciosPabellon',
      name: 'serviciosPabellon',
      component: () => import('../views/ServiciosPabellon.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/Favoritos.vue')
    }
  ]
})

export default router
