<template>
  <div class="container">
    <div class="page-header">
      <h1>➕ Añadir Nuevo Festival</h1>
      <p class="subtitle">Comparte un nuevo festival con la comunidad</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="festival-form">
      <div class="form-group">
        <label for="nombre">Nombre del Festival</label>
        <input 
          type="text" 
          id="nombre" 
          v-model="nuevoFestival.nombre" 
          required
          placeholder="Ej: Rock en la Playa"
        >
      </div>

      <div class="form-group">
        <label for="mes">Mes del Festival</label>
        <select 
          id="mes" 
          v-model="nuevoFestival.mes" 
          required
        >
          <option value="">Selecciona un mes</option>
          <option v-for="mes in meses" :key="mes" :value="mes">
            {{ mes }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="pais">País</label>
        <input 
          type="text" 
          id="pais" 
          v-model="nuevoFestival.pais" 
          required
          placeholder="Ej: España"
        >
      </div>

      <div class="form-group">
        <label for="genero">Género Musical</label>
        <select id="genero" v-model="nuevoFestival.genero" required>
          <option value="">Selecciona un género</option>
          <option v-for="genero in generosUnicos" :key="genero" :value="genero">{{ genero }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="precio">Precio (€)</label>
        <input 
          type="number" 
          id="precio" 
          v-model="nuevoFestival.precio" 
          required
          min="0"
          step="1"
          placeholder="Ej: 45"
        >
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea 
          id="descripcion" 
          v-model="nuevoFestival.descripción" 
          required
          placeholder="Escribe una breve descripción del festival">
        </textarea>
      </div>

      <button type="submit" class="btn-submit">Añadir Festival 🎵</button>
    </form>

    <div class="festival-added" v-if="ultimoFestival">
      <h2>Festival Añadido</h2>
      <div class="festival-card">
        <h3>{{ ultimoFestival.nombre }}</h3>
        <p><strong>Mes:</strong> {{ ultimoFestival.mes }}</p>
        <p><strong>País:</strong> {{ ultimoFestival.pais }}</p>
        <p><strong>Género:</strong> {{ ultimoFestival.genero }}</p>
        <p><strong>Precio:</strong> {{ ultimoFestival.precio }}€</p>
        <p><strong>Descripción:</strong> {{ ultimoFestival.descripción }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFestivalesStore } from '@/stores/festivales'

const festivalesStore = useFestivalesStore()
const ultimoFestival = ref(null)

const nuevoFestival = ref({
  nombre: '',
  pais: '',
  genero: '',
  mes: '',
  precio: '',
  descripción: ''
})

const generosUnicos= computed(() => {
  return [...new Set(festivalesStore.festivales.map(festival => festival.genero))]
})

const meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

const handleSubmit = () => {
  festivalesStore.agregarFestival({
    ...nuevoFestival.value,
    precio: parseInt(nuevoFestival.value.precio)
  })
  
  // Guardamos el festival que acabamos de añadir
  ultimoFestival.value = { ...nuevoFestival.value }
  
  // Reseteamos el formulario
  nuevoFestival.value = {
    nombre: '',
    pais: '',
    genero: '',
    mes: '',
    precio: ''
  }
}
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

.festival-form {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.btn-submit {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-submit:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

.btn-submit:active {
  transform: translateY(0);
}

.festival-added {
  width: 100%;
}

.festival-added h2 {
  text-align: center;
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
}

.festival-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.festival-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.festival-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.festival-card p {
  margin: 0.5rem 0;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.festival-card strong {
  color: #2c3e50;
  min-width: 80px;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
