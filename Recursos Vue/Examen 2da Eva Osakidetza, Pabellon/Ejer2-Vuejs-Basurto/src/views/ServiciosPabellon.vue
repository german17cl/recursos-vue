<template>
    <div class="servicios">
        <Basurto></Basurto>
        <br/>
        <div class="recuadro">
            <h3>Servicios por pabellón</h3>
            <select name="" id="" v-model="pabellonSeleccionado" @change="mostrarServiciosPabellon">
                <option v-for="valor in pabellones" :value="valor">{{ valor }}</option>
            </select>
            <br/><br/>
            <div id="serviciosPabellon">
                <div v-for="servicio in serviciosPabellon">
                    <img :src="'../../src/assets/iconos/' + servicio.ICONO" width="20px">
                    <span v-text="servicio.SERVICIO"></span>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style>
@media (min-width: 1024px) {
    .servicios {
        min-height: 100vh;
        align-items: center;
    }
}
</style>
  
<script>
import Basurto from '../components/Basurto.vue'
import axios from 'axios'
export default {
    name: 'Servicios',
    components: {Basurto},
    mounted() {
        this.cargarServicios();
    },
    data() {
        return {
            servicios: [],
            serviciosPabellon: [],
            pabellonSeleccionado: '',
            filtroServicio: '',
        }
    },
    methods: {
        cargarServicios() {
            axios.get('../../src/js/basurto.json')
                .then((respuesta) => {
                    console.log(respuesta.data);
                    this.servicios = respuesta.data;
                });
        },
        mostrarServiciosPabellon() {
            this.serviciosPabellon = this.servicios.filter(servicio => servicio.ENTRADA == this.pabellonSeleccionado);
        }
    },
    computed: {
        pabellones() {
            let todosPabellones = [];
            this.servicios.forEach(servicio => {
                todosPabellones.push(servicio.ENTRADA);
            });
            return [... new Set(todosPabellones)];
        },
    }
};
</script>