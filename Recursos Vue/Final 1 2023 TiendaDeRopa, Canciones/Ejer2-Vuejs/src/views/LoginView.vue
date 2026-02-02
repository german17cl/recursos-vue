<template>
    <div class="about">
      <h1>Página de Login | Login orrialdea</h1>
      <hr>
      <h2>Datos de acceso </h2>
      <form @submit.prevent>
          <p>
              <label for="username">Usuario: </label>
              <input type="text" id="username" placeholder="Introduce tu usuario" v-model="userName">
          </p>
               
          <p>
              <label for="pass">Password: </label>
              <input id="pass1" type="password" v-model="passUsuario" @key.enter="comprobarUsuario" placeholder="Introduce tu contraseña">
          </p>
          <br>
          <button value="Login usuario" @click="comprobarUsuario" :disabled="(verRutas)">Login Usuario</button>
    </form>
    
      <hr>
      <!-- <pre>{{ $data }}</pre> -->
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import { mapState, mapActions } from 'pinia'
    import {useStore} from '@/stores/store'
    export default {
        
      data(){
        return{
          usuarios:[],
          userName:'',
          passUsuario:'',
        }
      },
      mounted() {
          this.cargarUsuarios();
      },
      methods:{
        ...mapActions(useStore,['cambiarVerRutas','addUser']),
        cargarUsuarios() {
          axios.get('/json/users.json')
              .then((respuesta) => {
                  console.log(respuesta);
                  this.usuarios = respuesta.data; //la respuesta con vue-resource venia en body, AHORA VIENE EN data
              });
        },
        comprobarUsuario(){
          const posicionUser=this.usuarios.findIndex(el => el.username==this.userName);
          const posicionPassword=this.usuarios.findIndex(el => el.password==this.passUsuario);
          if(posicionUser==posicionPassword && posicionUser!=-1)
            {
              alert("Usuario correcto");
              this.cambiarVerRutas();
              this.addUser(this.userName)
              /* sessionStorage.setItem("nombreUsuario", this.usuarios[posicionEmail].name);
              window.location.href = '/compras' */
            }
          else
            {
              alert("Login Incorrecto. Vuelve a intentarlo");
              this.userName="";
              this.passUsuario="";
            }
        },
      },
      computed:{
        ...mapState(useStore, ['verRutas'])
       }
      }
  </script>