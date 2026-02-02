<template>
  <div class="container">
    <div class="page-header">
      <h1>🎸 Festivales por Género</h1>
      <p class="subtitle">Encuentra festivales según tu estilo musical favorito</p>
    </div>

    <div class="filtros-container">
      <h3>Selecciona los géneros</h3>
      <div class="checkbox-group">
        <label v-for="genero in generosUnicos" :key="genero" class="checkbox-label">
          <input
            type="checkbox"
            :value="genero"
            v-model="generosSeleccionados"
          >
          {{ genero }}
        </label>
      </div>
    </div>

    <div class="festivales-tabla" v-if="festivalesFiltrados.length > 0">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Género</th>
            <th>Mes</th>
            <th>País</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="festival in festivalesFiltrados" :key="festival.nombre">
            <td>{{ festival.nombre }}</td>
            <td>{{ festival.genero }}</td>
            <td>{{ festival.mes }}</td>
            <td>{{ festival.pais }}</td>
            <td>{{ festival.precio }}€</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-resultados">
      <p>No hay festivales para los géneros seleccionados</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import festivalesData from '@/assets/festivales.json'

const festivales = ref(festivalesData.festivales)
const generosSeleccionados = ref([])

const generosUnicos = computed(() => {
  return [...new Set(festivales.value.map(festival => festival.genero))]
})

const festivalesFiltrados = computed(() => {
  if (generosSeleccionados.value.length === 0) {
    return festivales.value
  }
  return festivales.value.filter(festival => 
    generosSeleccionados.value.includes(festival.genero)
  )
})
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

.filtros-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
}

.filtros-container h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-label:hover {
  border-color: #3498db;
}

.festivales-tabla {
  width: 100%;
  overflow-x: auto;
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

.no-resultados {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 8px;
  color: #64748b;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .checkbox-group {
    gap: 0.5rem;
  }

  .checkbox-label {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.75rem;
  }
}
</style>
