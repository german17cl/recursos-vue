
<script >
import { RouterLink, RouterView } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import {useStore} from '@/stores/store'


export default{
  data(){
    return{
    }
  },
  computed:{
    ...mapState(useStore, ['verRutas'])
  }
}

</script>

<template>
  <header>
    <img alt="Txurdi logo" class="logo" src="@/assets/Logo_Txurdi.png"  width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink> | 
        <RouterLink to="/login">Login</RouterLink> <span v-if="verRutas"> | </span>  
        <RouterLink to="/articulos" v-if="verRutas">Articulos</RouterLink> <span v-if="verRutas"> | </span> 
        <RouterLink to="/carrito" v-if="verRutas">Carrito</RouterLink> <span v-if="verRutas"> | </span> 
        <RouterLink to="/logout" v-if="verRutas">LogOut</RouterLink> <span v-if="verRutas"> </span> 
        
        | <RouterLink to="/about" >About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
