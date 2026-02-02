<template>
    <h1>COMPRAS de {{userStored}}</h1>
    <hr>
    <div>
    <h2>Búsquedas</h2>
    <p>Los filtros NO son excluyentes, es decir se puede filtrar por categoríaa, por precio y por categoría y precio</p>

    <table>
      <tr>
        <td>
          <input type="checkbox" v-model="checkCategory"> Categorias
        </td>
        <td>
          <input type="checkbox" v-model="checkPrice"> Precio
        </td>
      </tr>
        <td>
          
          <template id="busquedasCategory" v-if="checkCategory">
            <h3>Filtrar por Categorias {{ catSelected }}</h3>
            <select v-model="catSelected">
              <option value="">Todas</option>
              <option v-for="categoria in categorias" :value="categoria">{{categoria}}</option>
            </select>
          </template>
        </td>
        <td>
          <template id="busquedasPrice" v-if="checkPrice">
            <h3>Filtrar por precio</h3> 
            <label for="euros">Precio (0-1000): {{ precioMax }} € (default 1000€)</label>
            <input type="range" id="euros" style="background: #fff" min="0" max="1000" v-model="precioMax" value=20>
          </template>
        </td>
    </table>
      
      
    </div>
    <hr>
    <h2>Listado de artículos</h2>
    <!-- <ul>
      <li v-for="articulo in buscarArticulos">
        {{ articulo.title }} - {{ articulo.category }}
      </li>
    </ul> -->
    <table border="1" class="content-table" v-if="buscarArticulos.length > 0">
      <thead>
        <tr>
        <th scope="col">Artículo</th>
        <th scope="col">Categoría</th>
        <th scope="col">Descripción</th>
        <th scope="col">Imagen</th>
        <th scope="col">Precio</th>
        <th scope="col">Comprar</th>
      </tr>
      </thead>
      <tbody>
          <tr scope="row" v-for="articulo in buscarArticulos">
          <td width="200px">{{ articulo.title }}</td>
          <td>{{ articulo.category }}</td>
          <td width="500px">{{ articulo.description }}</td>
          <td><a :href="articulo.image" target="_blank">
                <img height="60" width="60" :src="articulo.image">
              </a>
          </td>
          <td>{{ articulo.price }}</td>
          <td><button @click="addCarrito(articulo.price, articulo.title)">Añadir al carrito</button></td>
        </tr>
      </tbody>
    </table>
    <table v-else>
      <tr>
        <td><h3>NO HAY NINGÚN ARTÍCULO QUE CUMPLA lOS CRITERIOS DE BÚSQUEDA</h3></td>
      </tr>
    </table>
      
    <!-- <p><hr></p>
    <h2>LIsta de la compra de {{ usuario }}</h2>
    <table border="1">
      <thead>
        <th>Producto</th>
        <th>Precio Unidad</th>
        <th>Unidades Compradas</th>
      </thead>
      <tbody>
        <tr v-for="element in carrito">
          <td> {{ element.title }} </td>
          <td> {{ element.precio}} </td>
          <td> {{ element.unidades }}</td>
        </tr>
      </tbody>
    </table>
    <h3>TOTAL COMPRA: {{ totalCarrito }}</h3> -->
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia'
import {useStore} from '@/stores/store'
export default{
    data(){
        return{
            categorias : [],
            articulos : [],
            catSelected : '', 
            checkCategory : false,
            checkPrice : false,
            precioMax : 1000
        }
    },
    computed:{
        ...mapState(useStore, ['verRutas','userStored']),
        buscarArticulos() {
          if(this.catSelected != ''){
            return this.articulos.filter((articulo) => articulo.category == this.catSelected &&  articulo.price <= this.precioMax)
          }
          else{
            return this.articulos.filter(articulo => articulo.price <= this.precioMax)
          }

        } 
    },
    methods:{
      ...mapActions(useStore,['cambiarVerRutas','addUser', 'addCarrito']),

    },
  
    mounted(){
        axios.get('/json/categories.json')
            .then((respuesta) => {
              console.log(respuesta);
              this.categorias = respuesta.data;
            });
        axios.get('/json/products.json')
        .then((respuesta) => {
            console.log(respuesta);
            this.articulos = respuesta.data;
        })
    }
}

</script>
<style scoped>
  table{
    margin: 0 auto  
  }
</style>  