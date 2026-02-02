import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({ 
    verRutas : false,
    userStored :'',
    carrito:[],
    totalCarrito: 0

  }),
  getters: {
    
  },
  actions: {
    cambiarVerRutas() {
      this.verRutas = !this.verRutas;
    },
    addUser(user){
      this.userStored=user
    },
    borrarUser(){
      this.userStored = ''
      this.carrito=[]
      this.totalCarrito=0
    },
    addCarrito( precio, titulo){
  
      const i = this.carrito.findIndex(element => element.title === titulo);
      if (i > -1) this.carrito[i].unidades++; // (2)
        else this.carrito.push({title:titulo, precio:precio, unidades:1} );
     
      this.totalCarrito+=precio;
      // indicamos que el artículo se ha añadido al carrito
      alert(`El articulo ${titulo} se ha añadido al carrito`)

    },
    
  }
    

  },
)
