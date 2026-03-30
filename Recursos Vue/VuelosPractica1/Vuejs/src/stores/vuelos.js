import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useVuelosStore = defineStore('vuelos', () => {
    
    //State
    const vuelos = ref ([])
    const cargado = ref(false)
    const reservas = ref ([])

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

    // Funciones 

    function getVueloById(codigo){
        return vuelos.value.find(v => v.codigo == codigo)
    }

    

    // function generarCodigo(){
    //     return Math.random().toString(36).substring(2, 8)
    // }

    // function addReserva(email, vuelo, pasajeros){
        
    //     const existe = reservas.value. 
    // }

    return {
        vuelos,
        cargarDatos,
        getVueloById
    }

    

})
