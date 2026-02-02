<template>
    <div class="servicios">
        <Basurto></Basurto>
        <br/>
        <h2>Tienes {{ numeroFavoritos }} favoritos</h2>
        <div class="recuadro">
            <div id="serviciosPabellon">
                <div v-for="servicio in favoritos">
                    <img :src="'../../src/assets/iconos/' + servicio.ICONO" width="20px">
                    <span v-text="servicio.SERVICIO"></span>
                    <img src="../../src/assets/eliminar.png" @click="eliminarFavorito(servicio)" width="20px"/>
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
import { mapState, mapActions } from 'pinia'
import { useFavoritos } from '@/stores/favoritos'
export default {
    name: 'Favoritos',
    components: {Basurto},
    methods: {
        ...mapActions(useFavoritos, ['eliminarFavorito']),
    },
        computed: {
        ...mapState(useFavoritos, ['numeroFavoritos', 'favoritos'])
    }
}
</script>




