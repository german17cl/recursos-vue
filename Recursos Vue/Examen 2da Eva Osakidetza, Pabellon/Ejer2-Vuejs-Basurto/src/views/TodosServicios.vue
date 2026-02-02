<template>
  <div class="servicios">
    <Basurto></Basurto>
    <Favoritos></Favoritos>
    <div class="recuadro">
      <h3>Filtrar por servicio</h3>
      <input type="text" v-model="filtroServicio"/>
    </div>
    <h3>Todos los servicios</h3>
    <table class="table text-center">
      <thead>
        <tr>
          <th>Icono</th>
          <th>Servicio</th>
          <th>Pabellón</th>
          <th>Fav</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="servicio in serviciosFiltrados">
          <td><img :src="'../../src/assets/iconos/' + servicio.ICONO" width="20px"></td>
          <td v-text="servicio.SERVICIO"></td>
          <td v-text="servicio.ENTRADA"></td>
          <td>

            <img v-if="favoritos.includes(servicio)" src="../../src/assets/corazon-lleno.png"
              @click="anadirFavorito(servicio)" width="22px" />
            <img v-else src="../../src/assets/corazon-vacio.png" @click="anadirFavorito(servicio)" width="20px" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<style>
@media (min-width: 1024px) {
  .servicios {
    min-height: 100vh;
    align-items: center;
  }
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  border: 1px solid #dddddd;
  padding: 8px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>

<script>
import Favoritos from '../components/CuadroFavoritos.vue'
import Basurto from '../components/Basurto.vue'
import { mapState, mapActions } from 'pinia'
import { useFavoritos } from '@/stores/favoritos'

import axios from 'axios'
export default {
  name: 'TodosServicios',
  components: { Favoritos, Basurto },
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
    ...mapActions(useFavoritos, ['anadirFavorito']),
    
    cargarServicios() {
      axios.get('../../src/js/basurto.json')
        .then((respuesta) => {
          this.servicios = respuesta.data;
          this.servicios = this.servicios.filter(function (servicio) {
                        return servicio.MOSTRAR ? servicio : null;
                    });
        });
    },
  },
  computed: {
    ...mapState(useFavoritos, ['numeroFavoritos', 'favoritos']),
    serviciosFiltrados() {
      console.log(this.servicios);
      return this.servicios.filter(servicio => servicio.SERVICIO.toLowerCase().includes(this.filtroServicio.toLowerCase()));
    },
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