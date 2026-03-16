import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VehiculosView from '../views/VehiculosView.vue'
import LoginView from '../views/LoginView.vue'
import VehiculosDetalleView from '../views/VehiculosDetalleView.vue'
import MisReservasView from '../views/MisReservasView.vue'
import { useAppStore } from '../stores/useAppStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vehiculos',
      name: 'vehiculos',
      component: VehiculosView
    },
    // Los alumnos añadirán más rutas aquí:
    // - Ruta dinámica para detalle de vehículo
    // - Ruta para mis reservas
    {
      path: '/vehiculos/:id',
      name: 'VehiculoDetalle',
      component: VehiculosDetalleView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/mis-reservas',
      name: 'misReservas',
      component: MisReservasView,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next ) =>  {
  const store = useAppStore()

  if(to.meta.requiresAuth && !store.usuario){
    next('/login')
  }else{
    next()
  }
})

export default router
