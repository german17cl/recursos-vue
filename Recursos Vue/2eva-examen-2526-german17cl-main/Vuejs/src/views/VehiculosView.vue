<template>
  <div>
    <h1>Vehículos</h1>

    <input v-model="filtroTexto" placeholder="Marca o modelo">

    <select v-model="filtroTipo">
      <option value="">Todos</option>
      <option v-for="tipo in store.tiposUnicos" :key="tipo">
        {{ tipo }}
      </option>
    </select>

    <select v-model="filtroAcceso">
      <option value="todos">Todos</option>
      <option value="empleados">Empleados</option>
    </select>

    <div v-for="v in vehiculosFiltrados" :key="v.id">
      <img :src="`/images/${v.imagen}`" width="120">
      <p>{{ v.marca }} {{ v.modelo }}</p>
      <p>{{ v.tipo }}</p>
      <p>
        {{ v.acceso.includes('empleado')
          ? 'Acceso empleados'
          : 'Solo directivos'
        }}
      </p>

      <RouterLink :to="`/vehiculos/${v.id}`">
        Ver detalle
      </RouterLink>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVehiculosStore } from '../stores/useVehiculosStore'
import { RouterLink } from 'vue-router'

const store = useVehiculosStore()

const filtroTexto = ref('')
const filtroTipo = ref('')
const filtroAcceso = ref('todos')

onMounted(() => {
  store.cargarDatos()
})

const vehiculosFiltrados = computed(() => {
  return store.vehiculos.filter(v => {

    const textoOk =
      (v.modelo + v.marca)
        .toLowerCase()
        .includes(filtroTexto.value.toLowerCase())

    const tipoOk =
      !filtroTipo.value || v.tipo === filtroTipo.value

    const accesoOk =
      filtroAcceso.value === 'todos' ||
      v.acceso.includes('empleado')

    return textoOk && tipoOk && accesoOk
  })
})
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
