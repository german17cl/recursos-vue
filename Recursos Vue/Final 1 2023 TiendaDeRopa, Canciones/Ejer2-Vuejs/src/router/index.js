import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ArticulosView from '../views/ArticulosView.vue'
import CarritoView from '../views/CarritoView.vue'
import LogOutView from '../views/LogOutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: ArticulosView
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOutView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
