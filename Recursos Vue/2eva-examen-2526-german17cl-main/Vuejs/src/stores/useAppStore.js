import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

    //State
    const usuario = ref(null)
    const reservas = ref([])

    //Actions

    function login(user){
        usuario.value = user
    }

    function logout(){
        usuario.value = null
        reservas.value = []
    }

    function agregarReserva(reserva){
        reservas.value.push(reserva)
    }

    return{
    usuario,
    reservas,
    login,
    logout,
    agregarReserva
    }
})