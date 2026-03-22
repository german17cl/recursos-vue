<template>
    <input v-model="email" placeholder="Email">
    <input v-model="codigo" placeholder="Código reserva">

    <button @click="consultar">Consultar</button>

    <div v-if="resultado.length">
    <div v-for="r in resultado" :key="r.codigoReserva">
        {{ r.vuelo.codigo }} - {{ r.vuelo.origen }} - {{ r.vuelo.destino }}
    </div>
    </div>

    <p v-else-if="buscado">No hay resultados</p>
    
</template>

<script setup>
import { ref } from 'vue'

        const email = ref('')
        const codigo = ref('')
        const resultado = ref([])
        const buscado = ref(false)

        function consultar() {
        buscado.value = true

        if (codigo.value) {
            const r = store.reservas.find(r =>
            r.email === email.value && r.codigoReserva === codigo.value
            )
            resultado.value = r ? [r] : []
        } else {
            resultado.value = store.reservas.filter(r =>
            r.email === email.value
            )
        }
        }
    </script>