
<template>
  <div>
      <h1>Vuelos</h1>
  </div>
</template>


<script setup>
import { ref, computed, onMounted} from 'vue'
import { useVuelosStore } from '../stores/vuelos'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useVuelosStore()

onMounted(() => {
  store.cargarDatos()
})


// Navegar a detalle
  function verDetalle(codigo){
    router.push(`/vuelos/${codigo}`)
  }

  function formatearDuracion(min){
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}h ${m}m`
  }


</script>


<style scoped>

</style>
