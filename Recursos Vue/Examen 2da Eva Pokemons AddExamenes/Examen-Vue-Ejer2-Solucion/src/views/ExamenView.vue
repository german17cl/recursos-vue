<template>
    <div>
      <h1>Aquí montamos el examen</h1>
      <h2>Examen mínimos {{ curso }}</h2>
      <form v-on:submit.prevent="nuevoAlumno">
        <label for="nombre">Nombre: </label>      
        <input type="text" placeholder="Introduce tu nombre" v-model="nuevoNombre" >
        <br>
        <label for="email">Email: </label>
        <input type="text" id="email" placeholder="Introduce tu email" v-model="nuevoEmail" @blur.prevent="comprobarEmail" @keyup.13="comprobarEmail">
        <span v-if="msgEmail[1]" style="color:red;">{{msgEmail[0]}}</span>
        <br>
        <label for="pass">Password: </label>
        <input id="pass1" type="password" placeholder="Introduce tu contraseña: mayus, minus y nums entre 8 y 16 car" v-model="nuevaPass" @keyup="comprobarPass" >
        <span v-if="msgPass[1]" style="color:red;">{{msgPass[0]}}</span>
        <br>
        <input type="submit" value="Nuevo Alumno" v-show="enabledButton">
        </form>
        <hr>
        <div>
          <table>
            <th>Nombre</th>
            <th>email</th>
            <th>Password</th>
            <tr v-for="(alumno, index) in alumnado" >
              <td>
                <input v-if="ver" type="text" v-model="alumno.nombre">
                <span v-else>{{ alumno.nombre }}</span>
              </td>
              <td>
                <input v-if="ver" type="text" v-model="alumno.email">
                <span v-else>{{ alumno.email }}</span>
              </td>
              <td>
                <input v-if="ver" type="text" v-model="alumno.password">
                <span v-else>{{ alumno.password }}</span>
              </td>
              <td>
                <button @click="borrarElemento(index)">Eliminar</button>
              </td>
              <td>
                <button   @click="Editar">
                   <span v-if="!ver">Activar Edición</span>
                   <span v-else>Desactivar Edición</span> 
                  </button>
              </td>
            </tr>
          </table>
        </div>
    </div>
  </template>

<script>
  export default {
    data(){
      return{
        ver:false,
        curso:"2DW3",
        nuevoNombre: null,
        nuevoEmail:null,
        nuevaPass:null,
        enabledButton:false,
        msgEmail:["correo incorrecto", false],
        msgPass: ["Password incorrecta", false],
        alumnado:[
          {
            nombre:"Jose",
            email:"jminsausti@fptxurdinaga.com",
            password:"2dw3-Jose"
          },
          {
            nombre: "Laura",
            email: "laura.f@fptxurdinaga.com",
            password: "2dw3-Laura"
          }
      ]
      }
    },
  methods:{
    Editar(){
    return this.ver=!this.ver
  },
    comprobarEmail(){
      //email
      if( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.nuevoEmail)){
        // alert("email correcto");
        this.msgEmail[1]=false
      }
      else{
        // alert("email incorrecto")
        document.getElementById("email").focus();
        this.msgEmail[1]=true
      }
  },
    comprobarPass(){
      //La contraseña debe tener mayusculas, minusculas y números entre 8 y 16 caracteres
      if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(this.nuevaPass)){
        // alert("Password Correcto");
        this.msgPass[1]=false;
        this.enabledButton=true;
      }
      else{
        // alert("Password no valida")
        document.getElementById("pass1").focus();
        this.msgPass[1]=true;
        this.enabledButton=false;
      }
    },
    nuevoAlumno(){
      this.alumnado.push(
        {
          nombre:this.nuevoNombre,
          email:this.nuevoEmail,
          password:this.nuevaPass
        })
    },
    borrarElemento(i){
      this.alumnado.splice(i,1)
    }
  }
}
</script>