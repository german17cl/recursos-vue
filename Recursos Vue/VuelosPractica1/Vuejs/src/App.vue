<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useVuelosStore } from './stores/vuelos'

const store = useVuelosStore()
</script>

<template>
  <header class="navbar">
    <div class="container">
      <div class="nav-brand">
        Txurdinaga Fly - Gestión de vuelos
      </div>
      <nav class="nav-links">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/vuelos">Ver vuelos</RouterLink>
        <RouterLink to="/consultar">Consultar vuelo</RouterLink>
        
      </nav>
    </div>
  </header>

  <main class="container main-content">
    <RouterView />
  </main>
</template>
