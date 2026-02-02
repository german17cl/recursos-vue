<template>
    
    <h1>Txurdi STORE </h1>
    <template v-if="login">
        <h2>Si has terminado con tu compra pulsa el botón para cerrar sesion</h2>
        <button @click="cerrarSesion" :disabled="!(verRutas)">Pulsa para cerrar sesiónn</button>
    </template>
    <template v-else>
        <h2>Gracias por utilizar nuestra tienda, será redirigido/a en breve a home</h2>
    </template>   
    


</template>

<script>
    import { mapState, mapActions } from 'pinia'
    import {useStore} from '@/stores/store'
    export default {
        data(){
            return{
               login : true
             }
        },

        methods:{
            ...mapActions(useStore,['cambiarVerRutas','addUser','borrarUser', 'vacirCarrito']),
            cerrarSesion(){
                this.borrarUser();
                this.cambiarVerRutas();
                this.login=false;
                const timeOut=setTimeout(this.rutaPush, 3000)
                
            // this.vacirCarrito();
            },
            rutaPush(){
                this.$router.push('/')
            }
        },
        computed:{
        ...mapState(useStore, ['verRutas'])
       }    
    }

</script>