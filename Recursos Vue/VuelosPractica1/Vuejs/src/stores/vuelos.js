import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useVuelosStore = defineStore('vuelos', () => {
    
    //State
    const vuelos = ref([])
    const cargado = ref(false)
    const reservas = ref([])

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

    function generarCodigo() {
    return Math.random().toString(36).substring(2, 8)
    }

    function addReserva(email, vuelo, pasajeros) {

    const existe = reservas.value.find(r =>
        r.email === email && r.vuelo.codigo === vuelo.codigo
    )

    if (existe) {
        return { error: 'Ya tienes una reserva con ese e-mail para ese vuelo' }
    }

    const codigoReserva = generarCodigo()

    reservas.value.push({
        email,
        vuelo,
        pasajeros,
        codigoReserva
    })

    return { codigoReserva }
    }

    function getVueloById(codigo){
        return vuelos.value.find(v => v.codigo == codigo)
    }

    const origenesUnicos = computed(() =>
        [...new Set(vuelos.value.map(v => v.origen))]
    )

    const destinosUnicos = computed(() =>
        [...new Set(vuelos.value.map(v => v.destino))]
    )

    return {
    vuelos,
    reservas,
    origenesUnicos,
    destinosUnicos,
    cargarDatos,
    getVueloById,
    addReserva
    }

    

})
