import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useVuelosStore = defineStore('vuelos', () => {
    
    //State
    const vuelos = ref([])
    const cargado = ref(false)

    //Actions
    async function cargarDatos(){
        if(cargado.value)return
        try {
            const vuelosRes = await axios.get('/data/vuelos.json')
            
            vuelos.value = vuelosRes.data
            cargado.value = true

        } catch (error) {
            console.error('Error cargando datos', error)
        }
    }

    function getVueloById(codigo){
        return vuelos.value.find(v => v.codigo == codigo)
    }

    const vuelosUnicos = computed(() =>
    [...new Set(vuelos.value.map(v => v.nombre))]
    )

    return{
        vuelos,
        vuelosUnicos,
        cargarDatos,
        getVueloById
    }

})
