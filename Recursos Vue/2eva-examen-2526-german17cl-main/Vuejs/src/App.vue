<script setup>
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/useAppStore';

const  store = useAppStore()

function cerrarSesion(){
  store.logout()
}


</script>

<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="container">
          <div class="nav-brand">
            <h1>⚡ Txurdinaga Tech</h1>
            <p>Sistema de Reserva de Vehículos</p>
          </div>
          <div class="nav-links">
            <RouterLink to="/">Inicio</RouterLink>
            <RouterLink to="/vehiculos">Vehículos</RouterLink>
            <!-- Los alumnos añadirán más enlaces aquí -->
            
            
            <RouterLink to="/login" v-if="!store.usuario">
              Login
            </RouterLink>
            
            <RouterLink to="/mis-reservas" v-if="store.usuario">
              Mis Reservas
            </RouterLink>

            <span v-if="store.usuario">
              {{ store.usuario.nombre }}
            </span>

            <button v-if="store.usuario" @click="cerrarSesion">
              Cerrar Sesión
            </button>

          </div>
        </div>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2026 Txurdinaga Tech - Portal de Empleados</p>
      </div>
    </footer>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 2rem 0;
}
</style>
