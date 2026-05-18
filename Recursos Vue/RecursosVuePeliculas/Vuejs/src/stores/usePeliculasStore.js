// stores/usePeliculasStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const usePeliculasStore = defineStore('peliculas', () => {

    // State
    const peliculas = ref([])
    const generos = ref([])
    const usuarios = ref([])
    const cargado = ref(false)

    // FAVORITOS
    const favoritos = ref([]) // ⚠️ Esto faltaba

    // Actions
    async function cargarDatos() {
        if(cargado.value) return
        try {
            const res = await axios.get('/data/db.json') // JSON único con todo

            // Guardar datos en los refs
            peliculas.value = res.data.peliculas.map(p => ({
                ...p,
                genero: res.data.generos.find(g => g.id === p.generoId)?.nombre || 'Desconocido'
            }))
            generos.value = res.data.generos
            usuarios.value = res.data.usuarios
            cargado.value = true

        } catch (error) {
            console.error('Error cargando datos', error)
        }
    }

    function getPeliculaById(id) {
        return peliculas.value.find(p => p.id == id)
    }

    // Generos únicos
    const generosUnicos = computed(() => [...new Set(generos.value.map(g => g.nombre))])

    // Usuarios por email (para login)
    function getUsuarioByEmail(email) {
        return usuarios.value.find(u => u.email === email)
    }

    // FUNCIONES FAVORITOS
    function marcarFavorito(id) {
        if(favoritos.value.includes(id)) {
            favoritos.value = favoritos.value.filter(f => f !== id)
        } else {
            favoritos.value.push(id)
        }
    }

    return {
        peliculas,
        generos,
        usuarios,
        cargado,
        favoritos,
        cargarDatos,
        getPeliculaById,
        generosUnicos,
        getUsuarioByEmail,
        marcarFavorito
    }
})
