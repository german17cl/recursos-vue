import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useVehiculosStore = defineStore('vehiculos', () => {

    //State

    const vehiculos = ref([])
    const categorias = ref([])
    const cargado = ref(false)

    //Actions

    async function cargarDatos(){
        if(cargado.value)return
        try {
            const vehiculosRes = await axios.get('/data/vehiculos.json')
            const categoriasRes = await axios.get('/data/categorias.json')

            vehiculos.value = vehiculosRes.data
            categorias.value = categoriasRes.data
            cargado.value = true

        } catch (error) {
            console.error('Error cargando datos', error)
        }
    }

    function getVehiculoById(id){
        return vehiculos.value.find(v => v.id == id)
    }

    //Categorias sin repetir

    const tiposUnicos = computed(() =>
    [...new Set(categorias.value.map(c => c.nombre))]
    )

    return{
        vehiculos,
        categorias,
        tiposUnicos,
        cargarDatos,
        getVehiculoById
    }
})


