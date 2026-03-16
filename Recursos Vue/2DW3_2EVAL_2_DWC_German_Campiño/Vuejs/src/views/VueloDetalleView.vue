<template>
    <div class="pelicula-detalle-view" v-if="vuelo">
        <button class="btn-volver" @click="volver">← Volver a la lista de vuelos</button>

        <div class="detalle-card">


            <div class="info">
                <h2>Vuelo: {{ vuelo.codigo }}</h2>
                <p><strong>Origen:</strong> {{ vuelo.origen }}</p>
                <p><strong>Destino:</strong> {{ vuelo.destino }} min</p>
                <p><strong>Fecha de salida:</strong> {{ vuelo.fechaSalida }}</p>
                <p><strong>Duración:</strong> {{ vuelo.duracion }}</p>
                <p><strong>Precio:</strong> {{ vuelo.precio }} €</p>

                <!-- Mostrar botón solo si hay usuario activo -->
                <div>
                    <h3>Reservar</h3>
                    <button @click="reservar">Reservar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVuelosStore } from '../stores/vuelos'

const store = useVuelosStore()
const route = useRoute()
const router = useRouter()




const vuelo = ref(null)

// Cargar película al montar
onMounted(async () => {
   await store.cargarDatos()
    const codigo = route.params.codigo
    vuelo.value = store.getVueloById(codigo)
})

function volver() {
    router.push('/vuelos')
}


</script>

<style scoped>
.pelicula-detalle-view {
    padding: 2rem 0;
}

.btn-volver {
    background: #1e3c72;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.detalle-card {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    background: #f8f8f8;
    padding: 1.5rem;
    border-radius: 8px;
}

.detalle-card img {
    max-width: 400px;
    width: 100%;
    border-radius: 6px;
    object-fit: cover;
}

.info {
    flex: 1;
}

.info h2 {
    margin-top: 0;
    color: #1e3c72;
}

.info button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #e74c3c;
    color: white;
}

.info button:hover {
    opacity: 0.9;
}

.login-msg {
    margin-top: 1rem;
    color: #555;
}
</style>
