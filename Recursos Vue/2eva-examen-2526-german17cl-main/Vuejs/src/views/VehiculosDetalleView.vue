<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useVehiculosStore } from '../stores/useVehiculosStore'
import { useAppStore } from '../stores/useAppStore'
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const vehiculosStore = useVehiculosStore()
const appStore = useAppStore()

const vehiculo = ref(null)
const fecha = ref('')
const motivo = ref('')
const error = ref('')

onMounted(async () => {
    await vehiculosStore.cargarDatos()
    vehiculo.value =
        vehiculosStore.getVehiculoById(route.params.id)
})

function reservar() {

    if (!appStore.usuario) {
        router.push('/login')
        return
    }

    if (!vehiculo.value.acceso.includes(appStore.usuario.rol)) {
        error.value = 'No tienes acceso a este vehículo'
        return
    }

    appStore.agregarReserva({
        vehiculo: vehiculo.value,
        fecha: fecha.value,
        motivo: motivo.value
    })

    router.push('/mis-reservas')
}
</script>

<template>
    <div v-if="vehiculo">
        <h1>{{ vehiculo.marca }} {{ vehiculo.modelo }}</h1>

        <img :src="`/images/${vehiculo.imagen}`">

        <p>{{ vehiculo.descripcion }}</p>

        <button @click="$router.back()">Volver</button>

        <div v-if="appStore.usuario">
            <h3>Reservar</h3>
            <input type="date" v-model="fecha">
            <input placeholder="Motivo" v-model="motivo">
            <button @click="reservar">Reservar</button>
        </div>

        <p v-else>
            Debes iniciar sesión para reservar
        </p>

        <p v-if="error">{{ error }}</p>
    </div>
</template>
