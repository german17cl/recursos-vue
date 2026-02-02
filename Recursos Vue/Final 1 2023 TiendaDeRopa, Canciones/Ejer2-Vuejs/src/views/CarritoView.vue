<template>
    <!-- <header><img alt="Txurdi logo" class="logo" src="@/assets/Logo_Txurdi.png"  width="125" height="125" /></header> -->
    <h1>
        CARRITO de {{userStored}}
    </h1>
    <hr>
    <table border="1" class="content-table" v-if="totalCarrito !=0">
      <thead>
        <tr>
        <th scope="col">Artículo</th>
        <th scope="col">Precio</th>
        <th scope="col">Unidades</th>
      </tr>
      </thead>
      <tbody>
          <tr scope="row" v-for="articulo in carrito">
          <td width="700px">{{ articulo.title }}</td>
          <td width="100px">{{ articulo.precio }}</td>
          <td width="100px">{{ articulo.unidades }}</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>TOTAL CARRITO</td>
            <td>{{ totalCarrito.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

</template>

<script>
    import { mapState, mapActions } from 'pinia'
    import {useStore} from '@/stores/store'

    export default {
        name: 'CarritoView',
        computed: {
            ...mapState(useStore, ['verRutas','userStored','carrito','totalCarrito']),
        },
        methods: {
            ...mapActions(useStore,['vaciarCarrito']),
        
        }
    }

</script>

<style scoped>
  table{
    margin: 0 auto  
  }
</style> 