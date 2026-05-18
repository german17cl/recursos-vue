import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeliculasView from '../views/PeliculasView.vue'
import LoginView from '../views/LoginView.vue'
import PeliculaDetalleView from '../views/PeliculaDetalleView.vue'
import MisFavoritosView from '../views/MisFavoritosView.vue'
import { usePeliculasStore } from '../stores/usePeliculasStore.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/peliculas',
    name: 'peliculas',
    component: PeliculasView
  },
  {
    path: '/peliculas/:id',
    name: 'peliculaDetalle',
    component: PeliculaDetalleView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/mis-favoritos',
    name: 'misFavoritos',
    component: MisFavoritosView,
    meta: { requiresAuth: true } // Solo visible si hay usuario logueado
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Control de acceso a rutas protegidas
router.beforeEach((to, from, next) => {
  const store = usePeliculasStore()

  if(to.meta.requiresAuth && !store.usuarioActivo){
    next('/login') // Redirige a login si no hay usuario activo
  } else {
    next() // Permite la navegación
  }
})


export default router
