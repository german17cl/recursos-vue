<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Inicio from './components/Inicio.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Inicio />

      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/festivales">Todos los Festivales</RouterLink>
        <RouterLink to="/festivales-genero">Festivales por Género</RouterLink>
        <RouterLink to="/anadir-festival">Añadir Festival</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 2rem;
  background: #2c3e50;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  font-weight: 600;
}

nav a.router-link-exact-active:hover {
  background-color: rgba(255, 255, 255, 0.35);
}

nav a {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: #ffffff;
  text-decoration: none;
  margin: 0 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

@media (min-width: 1024px) {
  header {
    padding: 2rem calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    font-size: 1.1rem;
    padding: 1rem 0;
    margin-top: 1rem;
    width: 100%;
  }
}

@media (max-width: 768px) {
  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  nav a {
    margin: 0.2rem 0;
  }
}
</style>
