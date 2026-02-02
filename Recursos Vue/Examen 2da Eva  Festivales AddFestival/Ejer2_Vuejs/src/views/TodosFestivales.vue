<template>
  <div class="container">
    <div class="page-header">
      <h1>🎵 Todos los Festivales</h1>
      <p class="subtitle">Explora nuestra colección de festivales</p>
    </div>
    <div class="recuadro">
      <h3>Buscar por nombre</h3>
      <input type="text" v-model="filtroNombre"/>
    </div>
    <h3>Todos los festivales</h3>
    <table class="table text-center">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>País</th>
          <th>Género</th>
          <th>Mes</th>
          <th>Precio</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="festival in festivalesFiltrados" :key="festival.nombre">
          <td><img :src="'../../src/assets/' + festival.imagen" width="50px" alt="festival"></td>
          <td>{{ festival.nombre }}</td>
          <td v-text="festival.pais"></td>
          <td v-text="festival.genero"></td>
          <td v-text="festival.mes"></td>
          <td v-text="festival.precio + '€'"></td>
          <td class="border p-2">
            <button><router-link :to="`/festival/${festival.nombre}`" >
              +info
            </router-link></button>
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFestivalesStore } from '@/stores/festivales'

const festivalesStore = useFestivalesStore()
const filtroNombre = ref('')

const festivalesFiltrados = computed(() => {
  return festivalesStore.getFestivalesFiltrados(filtroNombre.value)
})

onMounted(() => {
      festivalesStore.fetchFestivales();
    });
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
  margin: 20px 0;
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
