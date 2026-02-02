import { defineStore } from 'pinia'

//Definimos el almacén "favoritos" mediante defineStore
//Este almacén contendrá el estado, las getters y las acciones
export const useFavoritos = defineStore('favoritos', {
  state: () => ({ 
    numeroFavoritos:0,
    favoritos: []
  }),
  //En Pinia un getter es una función que se utiliza para obtener y calcular valores derivados del estado almacenado en un store.
  //Son similares a las propiedades computadas en Vue, pero están asociados a un store específico y se definen dentro de la sección getters al crear el store con defineStore.
  getters: {
  },
  //Las acciones modifican la propiedad contador del estado del almacén
  actions: {
    anadirFavorito(servicio) {
      /* Hacemos efecto toggle: si no existe, lo añade y si existe, lo elimina */
      if (!this.favoritos.includes(servicio)) {
      this.favoritos.push(servicio);
      this.numeroFavoritos++;
      } else {
        this.eliminarFavorito(servicio);
      }
    },
    eliminarFavorito(servicio) {
      /* Esto no se puede hacer con un pop ni con un shift, tenemos que recorrer el array para encontrar el servicio y eliminarlo */
      const index = this.favoritos.findIndex(eliminar => eliminar.SERVICIO === servicio.SERVICIO);
      if (index !== -1) {
        this.favoritos.splice(index, 1);
      }      
      this.numeroFavoritos--;
    }
  },
})
