<template>
    <div class="mis-favoritos-view">
        <h1>Mis Películas Favoritas</h1>

        <!-- Mensaje si no hay usuario activo -->
        <p v-if="!store.usuarioActivo">
            Debes <router-link to="/login">iniciar sesión</router-link> para ver tus favoritos.
        </p>

        <div v-else>
            <!-- Mensaje si no hay favoritos -->
            <p v-if="favoritas.length === 0">No tienes películas favoritas aún.</p>

            <!-- Lista de favoritos -->
            <div class="favoritos-grid" v-else>
                <div class="favorito-card" v-for="p in favoritas" :key="p.id">
                    <img :src="'/images/' + p.imagen" :alt="p.titulo" />
                    <h3>{{ p.titulo }}</h3>
                    <p><strong>Género:</strong> {{ p.genero }}</p>
                    <button @click="toggleFavorito(p)">💔 Quitar de favoritos</button>
                    <router-link :to="`/peliculas/${p.id}`" class="btn-detalle">Ver detalle</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePeliculasStore } from '../stores/usePeliculasStore.js'

const store = usePeliculasStore()

// Lista de películas favoritas (objetos completos)
const favoritas = computed(() => {
    if (!store.usuarioActivo) return [] // ⚠️ proteger si no hay usuario
    return store.favoritos
        .map(id => store.getPeliculaById(id))
        .filter(p => p) // por si no encuentra alguna
})

// Función para quitar o añadir favorita
function toggleFavorito(p) {
    if (!store.usuarioActivo) return
    store.marcarFavorito(p.id)
}
</script>

<style scoped>
.mis-favoritos-view {
    padding: 2rem 0;
}

.favoritos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.favorito-card {
    background: #f8f8f8;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

.favorito-card img {
    width: 100%;
    border-radius: 6px;
    object-fit: cover;
}

.favorito-card h3 {
    margin: 0.5rem 0;
    color: #1e3c72;
}

.favorito-card p {
    font-size: 0.9rem;
    color: #555;
    margin: 0.25rem 0 0.75rem 0;
}

.favorito-card button,
.favorito-card .btn-detalle {
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
}

.favorito-card button {
    background: #e74c3c;
}

.favorito-card button:hover {
    opacity: 0.9;
}

.favorito-card .btn-detalle {
    display: inline-block;
    background: #1e3c72;
    text-decoration: none;
    margin-top: 0.5rem;
}

.favorito-card .btn-detalle:hover {
    opacity: 0.9;
}
</style>
