<script setup>
import { useAppStore } from '../stores/useAppStore'

const store = useAppStore()
</script>

<template>
    <div>
        <h1>Mis Reservas</h1>

        <div v-for="(r, i) in store.reservas" :key="i">
            <p>{{ r.vehiculo.marca }} {{ r.vehiculo.modelo }}</p>
            <p>Fecha: {{ r.fecha }}</p>
            <p>Motivo: {{ r.motivo }}</p>
        </div>
    </div>
</template>
