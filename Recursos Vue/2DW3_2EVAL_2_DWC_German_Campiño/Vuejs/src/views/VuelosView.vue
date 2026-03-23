
<template>
  <div>
      <h1>Vuelos</h1>
      <div class="container-filtros">
        
        <div class="origen">
          <h3>Origen:</h3>
          <select v-model="filtroTipoOrigen">
            <option value="">Todos los orígenes</option>
            <option v-for="origen in store.origenesUnicos" :key="origen">
              {{ origen }}
            </option>
          </select>
        </div>

        <div class="destino">
          <h3>Destino:</h3>
          <select v-model="filtroTipoDestino">
            <option value="">Todos los destinos</option>
            <option v-for="destino in store.destinosUnicos" :key="destino">
              {{ destino }}
            </option>
          </select>
        </div>

        <div class="identificador">
          <h3>Identificador:</h3>
          <input v-model="filtroTexto" placeholder="Buscar por identificador...">
        </div>

        <div class="duracion">
          <h3>Duración máxima: {{ maxDuracion }} min</h3>
          <input type="range" v-model="maxDuracion" min="0" max="1000">
        </div>
      </div>
    
    
    <table border="1">
      <thead>
        <tr>
          <th>Código</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Fecha</th>
          <th>Duración</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="v in vuelosFiltrados" :key="v.codigo">
          <td>{{ v.codigo }}</td>
          <td>{{ v.origen }}</td>
          <td>{{ v.destino }}</td>
          <td>{{ v.fechaSalida }} {{ v.horaSalida }}</td>
          <td>{{ formatearDuracion(v.duracion) }}</td>
          <td>
            <button @click="verDetalle(v.codigo)">Ver detalle</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVuelosStore } from '../stores/vuelos'
import { useRouter } from 'vue-router'
const router = useRouter()

const store = useVuelosStore()

const filtroTexto = ref('')
const filtroTipoDestino = ref('')
const filtroTipoOrigen= ref('')
const maxDuracion = ref(1000)

onMounted(() => {
  store.cargarDatos()
})

const vuelosFiltrados = computed(() => {
  return store.vuelos.filter(v => {

    const textoOk =
      v.codigo.toLowerCase().includes(filtroTexto.value.toLowerCase())

    const origenOk =
      !filtroTipoOrigen.value || v.origen === filtroTipoOrigen.value

    const destinoOk =
      !filtroTipoDestino.value || v.destino === filtroTipoDestino.value

    const duracionOk =
      v.duracion <= maxDuracion.value

    return textoOk && origenOk && destinoOk && duracionOk
  })
})

// Navegar a detalle


  function verDetalle(codigo) {
      router.push(`/vuelos/${codigo}`)
  }

  function formatearDuracion(min) {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}h ${m}m`
  }

  
</script>


<style scoped>
.vehiculos-view {
  padding: 2rem 0;
}

h1 {
  color: #1e3c72;
  margin-bottom: 1rem;
}

.container-filtros{
  display:flex;
  justify-content: space-around;
  gap:10px;
  padding:10px;
  width: 100%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 1px 2px 20px lightgrey;
  margin-bottom: 20px;
}

.identificador{
  display: flex;
  flex-direction: column;
  width: 300px;
}

.origen{
  display: flex;
  flex-direction: column;
  width: 200px;
}

.destino{
  display: flex;
  flex-direction: column;
  width: 200px;
}

.duracion{
  display: flex;
  flex-direction: column;
  width: 400px;
}
</style>
