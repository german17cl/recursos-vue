import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlanetsStore = defineStore('planets', () => {
  const planets = ref([])
  const selectedPlanet = ref(null)
  const selectedDate = ref(null)
  const reservations = ref([])

  // Set planets data
  const setPlanets = (data) => {
    planets.value = data
  }

  // Set selected planet
  const setSelectedPlanet = (planet) => {
    selectedPlanet.value = planet
  }

  // Set selected date
  const setSelectedDate = (date) => {
    selectedDate.value = date
  }

  // Calculate price with discounts and surcharges
  const calculatePrice = (planet, travelMonth, passengers = 1) => {
    if (!planet) return 0
    
    let basePrice = planet.precio
    let finalPrice = basePrice
    let surcharge = 0
    let discount = 0
    
    // Apply 10% surcharge if not optimal month
    if (travelMonth && planet.mesOptimo && travelMonth !== planet.mesOptimo) {
      surcharge = basePrice * 0.1
      finalPrice += surcharge
    }
    
    // Apply passenger discount (5% per passenger, max 25%)
    if (passengers >= 2) {
      const maxDiscountPercentage = 0.25
      const discountPercentage = Math.min(0.05 * (passengers - 1), maxDiscountPercentage)
      discount = finalPrice * discountPercentage
      finalPrice -= discount
    }
    
    return {
      basePrice,
      finalPrice: Math.round(finalPrice),
      surcharge: Math.round(surcharge),
      discount: Math.round(discount),
      passengers
    }
  }

  // Add a new reservation
  const addReservation = (planet, passengers, travelMonth) => {
    const priceDetails = calculatePrice(planet, travelMonth, passengers)
    
    const reservation = {
      id: Date.now(),
      planet: { ...planet },
      passengers: passengers,
      date: new Date().toISOString(),
      travelMonth: travelMonth || new Date().getMonth() + 1,
      priceDetails: priceDetails,
      totalPrice: priceDetails.finalPrice
    }
    
    reservations.value.push(reservation)
    return reservation
  }

  // Get all reservations
  const allReservations = computed(() => [...reservations.value].reverse())
  
  // Get total spent on reservations
  const totalSpent = computed(() => {
    return reservations.value.reduce((total, reservation) => {
      return total + (reservation.priceDetails?.finalPrice || 0)
    }, 0)
  })

  return {
    planets,
    selectedPlanet,
    selectedDate,
    reservations: allReservations,
    totalSpent,
    setPlanets,
    setSelectedPlanet,
    setSelectedDate,
    addReservation,
    calculatePrice
  }
})
