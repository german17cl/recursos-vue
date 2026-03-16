<template>
  <div>
    <h1>Vuelos</h1>
    <h3>Identificador:</h3>
    <input v-model="filtroTexto" placeholder="Buscar por identificador...">

    <!-- <select v-model="filtroTipoOrigen" placeholder="Origen:">
      <option value="">Todos</option>
      <option v-for="origen in store.vuelosUnicos" :key="origen">
        {{ origen }}
      </option>
    </select> -->

    <!-- <select v-model="filtroTipoDestino" placeholder="Destino:">
      <option value="">Todos</option>
      <option v-for="destino in store.vuelosUnicos" :key="destino">
        {{ destino }}
      </option>
    </select> -->

    
    
    <div v-for="v in vuelosFiltrados" :key="v.id">
      <br>
      <p>{{ v.codigo }} / {{ v.origen }} / {{ v.destino }} / {{ v.fechaSalida }} {{ v.horaSalida }} / {{ v.duracion }}m / <button @click="verDetalle(vuelo.codigo)">Ver detalle</button></p>
      <br>
      

    
    
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVuelosStore } from '../stores/vuelos'
import { RouterLink } from 'vue-router'

const store = useVuelosStore()

const filtroTexto = ref('')
const filtroTipoDestino = ref('')
const filtroTipoOrigen= ref('')


onMounted(() => {
  store.cargarDatos()
})

const vuelosFiltrados = computed(() => {
  return store.vuelos.filter(v => {

    const textoOk =
      (v.codigo).toLowerCase().includes(filtroTexto.value.toLowerCase())

    const origenOk =
      !filtroTipoOrigen.value || v.origen === filtroTipoOrigen.value

    const destinoOk =
      !filtroTipoDestino.value || v.destino === filtroTipoDestino.value



    return textoOk && destinoOk && origenOk
  })
})

// Navegar a detalle


function verDetalle(codigo) {
    router.push(`/vuelos/${codigo}`)
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
</style>
