<template>
    <div class="pelicula-detalle-view" v-if="pelicula">
        <button class="btn-volver" @click="volver">← Volver al catálogo</button>

        <div class="detalle-card">
            <img :src="'/images/' + pelicula.imagen" :alt="pelicula.titulo" />

            <div class="info">
                <h2>{{ pelicula.titulo }}</h2>
                <p><strong>Género:</strong> {{ pelicula.genero }}</p>
                <p><strong>Duración:</strong> {{ pelicula.duracion }} min</p>
                <p><strong>Sinopsis:</strong> {{ pelicula.descripcion }}</p>

                <!-- Mostrar botón solo si hay usuario activo -->
                <button v-if="store.usuarioActivo" @click="toggleFavorito(pelicula)">
                    {{ esFavorita(pelicula.id) ? "💖 Favorita" : "♡ Marcar como favorita" }}
                </button>

                <p v-else class="login-msg">
                    Debes <router-link to="/login">iniciar sesión</router-link> para marcar favoritos
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePeliculasStore } from '../stores/usePeliculasStore.js'

const store = usePeliculasStore()
const route = useRoute()
const router = useRouter()

const pelicula = ref(null)

// Cargar película al montar
onMounted(async () => {
    await store.cargarDatos()
    const id = route.params.id
    pelicula.value = store.getPeliculaById(id)
})

function volver() {
    router.push('/peliculas')
}

// Funciones favoritos
function toggleFavorito(p) {
    if (!store.usuarioActivo) return // ⚠️ proteger si no hay usuario
    store.marcarFavorito(p.id)
}

function esFavorita(id) {
    if (!store.usuarioActivo) return false // ⚠️ proteger si no hay usuario
    return store.favoritos.includes(id)
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
