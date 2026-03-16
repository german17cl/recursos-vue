import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store de ejemplo - Los alumnos deberán crear su propio store
 * para gestionar la lista de vehículos en revisión
 */
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }

  return {
    count,
    doubleCount,
    increment,
    decrement
  }
})
