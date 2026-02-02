<template>
  <div class="destinos-view">
    <h1>Destinos Planetarios</h1>
    
    <!-- Filtros -->
    <div class="filters">
      <div class="filter-group">
        <label for="clima">Filtrar por clima:</label>
        <select id="clima" v-model="filters.clima">
          <option value="">Todos los climas</option>
          <option v-for="clima in climas" :key="clima" :value="clima">
            {{ clima }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="nombre">Buscar por nombre:</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="filters.nombre" 
          placeholder="Nombre del planeta..."
        >
      </div>
      
      <div class="filter-group">
        <label for="precio">Precio máximo: {{ formatPrice(filters.precioMax) }} €</label>
        <input 
          type="range" 
          id="precio" 
          v-model="filters.precioMax" 
          :min="minPrecio" 
          :max="maxPrecio" 
          :step="1000"
        >
      </div>
      

    </div>
    
    <!-- Tabla de planetas -->
    <div class="table-responsive">
      <table class="planets-table">
        <thead>
          <tr>
            <th @click="sortBy('nombre')">
              Nombre
              <span v-if="sortKey === 'nombre'" class="sort-icon">
                {{ sortOrder === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('clima')">
              Clima
              <span v-if="sortKey === 'clima'" class="sort-icon">
                {{ sortOrder === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('distancia')">
              Distancia (años luz)
              <span v-if="sortKey === 'distancia'" class="sort-icon">
                {{ sortOrder === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('precio')">
              Precio
              <span v-if="sortKey === 'precio'" class="sort-icon">
                {{ sortOrder === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('duracion')">
              Duración (días)
              <span v-if="sortKey === 'duracion'" class="sort-icon">
                {{ sortOrder === 1 ? '↑' : '↓' }}
              </span>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="planeta in filteredPlanets" :key="planeta.id">
            <td>{{ planeta.nombre }}</td>
            <td>{{ planeta.clima }}</td>
            <td>{{ planeta.distancia }}</td>
            <td class="price">{{ formatPrice(planeta.precio) }} €</td>
            <td>{{ planeta.duracion }}</td>
            <td>
              <button @click="reservarPlaneta(planeta)" class="reservar-btn">
                Reservar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlanetsStore } from '@/stores/planets';
import axios from 'axios';

const router = useRouter();
const planetsStore = usePlanetsStore();

const climas = ref([]);
const planets = ref([]);

// Valores máximos para los rangos
const minPrecio = ref(0);
const maxPrecio = ref(60000);

// Filtros
const filters = ref({
  clima: '',
  nombre: '',
  precioMax: 60000
});

// Ordenación
const sortKey = ref('nombre');
const sortOrder = ref(1); // 1 para ascendente, -1 para descendente

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Cargar planetas
    const planetasResponse = await axios.get('/json/planetas.json');
    planets.value = planetasResponse.data;
    planetsStore.setPlanets(planetasResponse.data);
    
    // Cargar climas
    const climasResponse = await axios.get('/json/climas.json');
    climas.value = [...new Set(climasResponse.data)].sort();
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});

// Planetas filtrados y ordenados
const filteredPlanets = computed(() => {
  let filtered = [...planets.value];
  
  // Aplicar filtros
  filtered = filtered.filter(planeta => {
    // Filtrar por clima
    if (filters.value.clima && planeta.clima !== filters.value.clima) {
      return false;
    }
    
    // Filtrar por nombre
    if (filters.value.nombre && 
        !planeta.nombre.toLowerCase().includes(filters.value.nombre.toLowerCase())) {
      return false;
    }
    
    // Filtrar por precio máximo
    if (planeta.precio > filters.value.precioMax) {
      return false;
    }
    
    return true;
  });
  
  // Aplicar ordenación
  return sortPlanets(filtered);
});

// Función para ordenar planetas
const sortPlanets = (planetsToSort) => {
  return [...planetsToSort].sort((a, b) => {
    let aValue = a[sortKey.value];
    let bValue = b[sortKey.value];
    
    // Manejar ordenación de cadenas
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      return aValue.localeCompare(bValue) * sortOrder.value;
    }
    
    // Ordenación numérica
    return (aValue - bValue) * sortOrder.value;
  });
};

// Función para cambiar el criterio de ordenación
const sortBy = (key) => {
  if (sortKey.value === key) {
    // Cambiar el orden si se hace clic en la misma columna
    sortOrder.value *= -1;
  } else {
    // Ordenar por la nueva columna en orden ascendente por defecto
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

// Función para formatear precios
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-ES').format(price);
};

// Función para reservar un planeta
const reservarPlaneta = (planeta) => {
  planetsStore.setSelectedPlanet(planeta);
  router.push('/reserva');
};
</script>

<style scoped>
.destinos-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.filter-group input[type="text"],
.filter-group select,
.filter-group input[type="range"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Estilos específicos para los rangos */
.filter-group input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin: 10px 0;
}

.filter-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #4CAF50;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-group input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  background: #45a049;
}

/* Estilos para los valores de los filtros */
.filter-value {
  display: block;
  margin-top: 5px;
  font-size: 0.9em;
  color: #555;
}

.table-responsive {
  overflow-x: auto;
}

.planets-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.planets-table th,
.planets-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

/* Estilos para las celdas de precios */
.planets-table .price {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #2c3e50;
}

/* Estilos para los encabezados ordenables */
.planets-table th {
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 25px;
  white-space: nowrap;
}

.planets-table th:hover {
  background-color: #e9e9e9;
}

.sort-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9em;
  color: #4CAF50;
}

.planets-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.planets-table tr:hover {
  background-color: #f1f1f1;
}

.reservar-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.reservar-btn:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 15px;
  }
  
  .filter-group {
    width: 100%;
  }
}
</style>
