<script>
  //import axios from 'axios'
  export default {
      name: 'HelloWorld',
      components: {},
      data(){
          return{
            imgId : Math.floor(Math.random() * 19) + 1,
          }
      },
      methods:{
          
      },
      mounted() {
        
      }
  }
</script>


<template>
  <div>
    <h1 class="green">Bienvenido a la tienda de TxurdiVue / <em>Ongi etorri TxurdiVue-ren dendara</em></h1>
    <h2></h2>
    <h3>
      Logeate y empieza a comprar / <em>Sartu eta hasi erosten  </em>  
    </h3>
    <div>
      <table>
        <tr v-for="i in 3">
          <td v-for="i in 2">
            <img width="100" height="100" :src="'../images/id-' + (Math.floor(Math.random() * 19)+1)  + '.jpg'" alt="Image 1" />
          </td>
        </tr>
      </table>
    </div>  
    
  </div>

</template>

<style scoped>
   div{
    text-align: center;
   }
   
   table{
    margin: auto;
   }
</style>
