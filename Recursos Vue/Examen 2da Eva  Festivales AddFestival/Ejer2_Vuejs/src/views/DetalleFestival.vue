<!-- src/views/DetalleFestival.vue -->
<template>
    <div>
      <div class="page-header">
        <h1>Descripción del Festival</h1>
      </div>
      <div class="recuadro">
        <div v-if="festival">
          <h2 class="text-xl font-semibold">{{ festival.nombre }}</h2>
          <p class="mt-2">{{ festival.descripción }}</p>
        </div>
        <div v-else>
          <p>Festival no encontrado.</p>
        </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { useFestivalesStore } from '@/stores/festivales'

  import { computed } from 'vue'
  
  const route = useRoute()
  const store = useFestivalesStore()
  
  const festival = computed(() =>
    store.festivales.find(f => f.nombre.toLowerCase() === route.params.nombre?.toLowerCase())
  )
  </script>
  <style scoped>
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
  }
  
  @media (min-width: 1024px) {
    .container {
      min-height: 100vh;
      align-items: center;
      padding: 20px;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background: #2c3e50;
    color: white;
    font-weight: 600;
    white-space: nowrap;
  }
  
  tr:nth-child(even) {
    background: #f8fafc;
  }
  
  tr:hover {
    background: #f1f5f9;
  }
  
  .recuadro {
    margin: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  input {
    padding: 5px;
    width: 200px;
    margin-top: 10px;
  }
  </style>