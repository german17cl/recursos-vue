<template>
    <div class="recuadro">
        <h3>Favoritos</h3>
        <h4>Tienes {{ numeroFavoritos }} favoritos</h4>
        <div v-for="servicio in favoritos">
            <img :src="'../../src/assets/iconos/' + servicio.ICONO" width="20px">
            <span v-text="servicio.SERVICIO"></span>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useFavoritos } from '@/stores/favoritos'

export default {
    name: 'Favoritos',
    components: {},
    mounted() {
    },
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(useFavoritos, ['anadirFavorito']),
    },
    computed: {
        ...mapState(useFavoritos, ['numeroFavoritos', 'favoritos']),
    }
};
</script>

<style>
.recuadro {
    border: 1px solid gray;
    padding: 20px;
    margin: 30px auto 10px;
    width: 50%;

}
</style>