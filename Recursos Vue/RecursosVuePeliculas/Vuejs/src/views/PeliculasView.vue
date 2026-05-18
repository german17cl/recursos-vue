<template>
    <div class="peliculas-view">
        <h1>Catálogo de Películas</h1>

        <!-- Filtros -->
        <div class="filtros" v-if="store.cargado">
            <input type="text" v-model="filtroTitulo" placeholder="Buscar por título..." />

            <select v-model="filtroGenero">
                <option value="">Todos los géneros</option>
                <option v-for="g in generosUnicos" :key="g" :value="g">{{ g }}</option>
            </select>

            <!-- Filtro por año -->
            <input type="number" v-model.number="filtroAnio" placeholder="Filtrar por año" min="1900" max="2100" />

            <!-- Filtro por duración -->
            <input type="number" v-model.number="duracionMin" placeholder="Duración mínima" min="0" />
            <input type="number" v-model.number="duracionMax" placeholder="Duración máxima" min="0" />
        </div>

        <!-- Lista de películas -->
        <div class="peliculas-lista" v-if="store.cargado">
            <div class="pelicula-card" v-for="pelicula in peliculasFiltradas" :key="pelicula.id">
                <img :src="`/images/${pelicula.imagen}`" :alt="pelicula.titulo" />
                <h3>{{ pelicula.titulo }}</h3>
                <p><strong>Género:</strong> {{ pelicula.genero }}</p>
                <p><strong>Año:</strong> {{ pelicula.anio }}</p>
                <p><strong>Duración:</strong> {{ pelicula.duracion }} min</p>

                <button @click="verDetalle(pelicula.id)">Ver detalle</button>

                <button v-if="store.usuarioActivo" @click="toggleFavorito(pelicula)">
                    {{ esFavorita(pelicula.id) ? "💖 Favorita" : "♡ Marcar como favorita" }}
                </button>

                <p v-else>Debes <router-link to="/login">iniciar sesión</router-link> para marcar favoritos</p>
            </div>
        </div>

        <p v-else>Cargando películas...</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePeliculasStore } from '../stores/usePeliculasStore.js'

const store = usePeliculasStore()
const router = useRouter()

// Filtros
const filtroTitulo = ref('')
const filtroGenero = ref('')
const filtroAnio = ref(null)
const duracionMin = ref(null)
const duracionMax = ref(null)

// Cargar datos al montar la vista
onMounted(async () => {
    await store.cargarDatos()
})

// Lista filtrada usando propiedades computadas
const peliculasFiltradas = computed(() => {
    if (!store.cargado) return []

    return store.peliculas
        .filter(p =>
            p.titulo.toLowerCase().includes(filtroTitulo.value.toLowerCase())
        )
        .filter(p =>
            filtroGenero.value ? p.genero === filtroGenero.value : true
        )
        .filter(p =>
            filtroAnio.value ? p.anio === filtroAnio.value : true
        )
        .filter(p =>
            duracionMin.value ? p.duracion >= duracionMin.value : true
        )
        .filter(p =>
            duracionMax.value ? p.duracion <= duracionMax.value : true
        )
})

// Obtener géneros únicos para el select
const generosUnicos = computed(() => {
    if (!store.cargado) return []
    return [...new Set(store.generos.map(g => g.nombre))]
})

// Navegar a detalle
function verDetalle(id) {
    router.push(`/peliculas/${id}`)
}

// Favoritos
function toggleFavorito(pelicula) {
    store.marcarFavorito(pelicula.id)
}

function esFavorita(id) {
    return store.favoritos.includes(id)
}
</script>




<style scoped>
.peliculas-view {
    padding: 2rem 0;
}

.filtros {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.filtros input,
.filtros select {
    padding: 0.5rem;
    font-size: 1rem;
}

.peliculas-lista {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.pelicula-card {
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.pelicula-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 6px;
}

.pelicula-card button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.pelicula-card button:first-of-type {
    background: #1e3c72;
    color: white;
}

.pelicula-card button:last-of-type {
    background: #e74c3c;
    color: white;
}

.pelicula-card button:hover {
    opacity: 0.9;
}
</style>
