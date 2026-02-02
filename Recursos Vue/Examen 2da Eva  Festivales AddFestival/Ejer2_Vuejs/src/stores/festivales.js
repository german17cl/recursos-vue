import { defineStore } from 'pinia'
import axios from 'axios'
//import festivalesData from '@/assets/festivales.json'

export const useFestivalesStore = defineStore('festivales', {
  state: () => ({
    festivales: [],
    cargado: false
  }),
  
  actions: {
    //ESTO IGUAL NOS LO PODEMOS CARGAR
    getImagenPorMes(mes) {
      const mesesInvierno = ['diciembre', 'enero', 'febrero']
      const mesesPrimavera = ['marzo', 'abril', 'mayo']
      const mesesVerano = ['junio', 'julio', 'agosto']
      const mesesOtono = ['septiembre', 'octubre', 'noviembre']

      if (mesesInvierno.includes(mes.toLowerCase())) return 'invierno.png'
      if (mesesPrimavera.includes(mes.toLowerCase())) return 'primavera.png'
      if (mesesVerano.includes(mes.toLowerCase())) return 'verano.png'
      if (mesesOtono.includes(mes.toLowerCase())) return 'otono.png'
      
      return 'assets/default.png'
    },

    async fetchFestivales() {
      // Solo cargar si no se ha cargado antes
      if (this.cargado || this.festivales.length > 0) return
      
      try {
        // Utilizamos axios directamente para cargar el archivo JSON
        const response = await axios.get('/festivales.json');
        this.festivales = response.data.festivales;
        this.cargado = true // evitar recargas futuras
      } catch (error) {
        this.error = error.message || 'Error al cargar los festivales';
        console.error('Error al cargar los festivales:', error);
      } finally {
        this.isLoading = false;
      }
    },

    agregarFestival(festival) {
      this.festivales.push({
        ...festival,
        imagen: this.getImagenPorMes(festival.mes)
      })
    }, 
    
    
  },

  getters: {
    getFestivalesPorGenero: (state)=> (generos) => {
      if (!generos.length) return state.festivales
      return state.festivales.filter(festival => generos.includes(festival.genero))
    },
    
    getFestivalesFiltrados: (state)=>(filtro) => {
      return state.festivales.filter(festival => 
        festival.nombre.toLowerCase().includes(filtro.toLowerCase())
      )
    }
  },

})

