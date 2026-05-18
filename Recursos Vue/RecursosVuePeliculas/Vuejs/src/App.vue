<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { usePeliculasStore } from './stores/usePeliculasStore.js'

const store = usePeliculasStore()

// Función para cerrar sesión
function logout() {
  store.usuarioActivo = null
}
</script>

<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="container">
          <!-- Logo / Branding -->
          <div class="nav-brand">
            <h1>🎬 CineClub</h1>
            <p>Gestión de Películas y Favoritos</p>
          </div>

          <!-- Enlaces de navegación -->
          <div class="nav-links">
            <RouterLink to="/">Inicio</RouterLink>
            <RouterLink to="/peliculas">Películas</RouterLink>

            <!-- Si NO hay usuario -->
            <RouterLink v-if="!store.usuarioActivo" to="/login">Login</RouterLink>

            <!-- Si hay usuario -->
            <template v-else>
              <span class="usuario-nombre">Hola, {{ store.usuarioActivo.nombre }}</span>
              <RouterLink to="/mis-favoritos">Mis Favoritos</RouterLink>
              <button @click="logout" class="btn-logout">Cerrar sesión</button>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2026 CineClub - Portal de Usuarios</p>
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
  padding: 2rem 1.5rem;
}

/* Navbar */
.navbar {
  background-color: #1e3c72;
  color: white;
  padding: 1rem 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

.usuario-nombre {
  margin-right: 1rem;
  font-weight: 600;
}

.btn-logout {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout:hover {
  background: #c0392b;
}

/* Footer */
footer {
  background: #f1f1f1;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}
</style>
