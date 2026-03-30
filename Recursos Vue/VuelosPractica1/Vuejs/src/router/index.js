import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VuelosView from '../views/VuelosView.vue'
import VueloDetalleView from '../views/VueloDetalleView.vue'
import ConsultaVuelosView from '../views/ConsultaVuelosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vuelos',
      name: 'vuelos',
      component: VuelosView
    },
    {
      path: '/vuelos/:codigo',
      name: 'VueloDetalle',
      component: VueloDetalleView
    },
    {
      path: '/consultar',
      name: 'consultar',
      component: ConsultaVuelosView
    },

  ]
})

export default router
