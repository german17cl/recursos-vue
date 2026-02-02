<template>
  <div class="reserva-view">
    <h1>Reserva tu Viaje</h1>
    
    <div v-if="!selectedPlanet" class="no-selection">
      <p>No se ha seleccionado ningún planeta. Por favor, selecciona un destino primero.</p>
      <router-link to="/destinos" class="btn">Ver Destinos</router-link>
    </div>
    
    <div v-else class="reservation-container">
      <!-- Sección de información del destino -->
      <div class="reservation-section planet-info">
        <div class="card">
          <div class="card-header">
            <h2>Información del Destino</h2>
          </div>
          <div class="card-body">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Planeta:</span>
                <span class="info-value">{{ selectedPlanet.nombre }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Clima:</span>
                <span class="info-value">{{ selectedPlanet.clima }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Distancia:</span>
                <span class="info-value">{{ selectedPlanet.distancia }} años luz</span>
              </div>
              <div class="info-item">
                <span class="info-label">Mejor época:</span>
                <div class="info-value">
                  <span class="optimal-months">{{ getMesOptimoNombre() }}</span>
                  <span v-if="selectedPlanet.mesOptimo" class="info-tooltip" :title="getOptimalMonthsTooltip()">ℹ️</span>
                </div>
              </div>
              <div class="info-item flag-container">
                <img 
                  :src="`/images/${selectedPlanet.bandera}`" 
                  :alt="`Bandera de ${selectedPlanet.nombre}`"
                  class="flag"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sección del formulario de reserva -->
      <div class="reservation-section reservation-form">
        <div class="card">
          <div class="card-header">
            <h2>Datos de la Reserva</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="confirmarReserva">
              <div class="form-group">
                <label for="pasajeros">Número de pasajeros (1-10):</label>
                <input 
                  type="number" 
                  id="pasajeros" 
                  v-model.number="pasajeros" 
                  min="1" 
                  max="10" 
                  required
                  class="form-control"
                >
              </div>
              
              <div class="form-group">
                <label for="mes">Mes de viaje:</label>
                <select id="mes" v-model="mesSeleccionado" class="form-control">
                  <option v-for="(mes, index) in ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']" 
                          :key="index" 
                          :value="mes">
                    {{ mes }}
                  </option>
                </select>
              </div>
              
              <!-- Resumen de precios -->
              <div class="price-summary">
                <h3>Resumen de Precios</h3>
                <div class="price-item">
                  <span>Precio base por persona:</span>
                  <span>{{ (selectedPlanet.precio || 0).toFixed(2) }} €</span>
                </div>
                <div class="price-item" v-if="!esMesOptimo">
                  <span>Recargo (10%):</span>
                  <span class="text-danger">+ {{ (selectedPlanet.precio * 0.10).toFixed(2) }} €</span>
                </div>
                <div class="price-item" v-if="pasajeros > 1">
                  <span>Descuento por grupo ({{ Math.min(pasajeros - 1, 4) * 5 }}%):</span>
                  <span class="text-success">- {{ (calculateDiscount() * 100).toFixed(0) }}%</span>
                </div>
                <div class="price-total">
                  <strong>Total para {{ pasajeros }} pasajero{{ pasajeros !== 1 ? 's' : '' }}:</strong>
                  <strong>{{ calculateTotalPrice().toFixed(2) }} €</strong>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                  Confirmar Reserva
                </button>
                <router-link to="/destinos" class="btn btn-secondary">
                  Volver a Destinos
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="reservas.length > 0" class="reservas-previas">
      <h2>Reservas Anteriores</h2>
      <table class="reservas-table">
        <thead>
          <tr>
            <th>Planeta</th>
            <th>Pasajeros</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reserva, index) in reservas" :key="index">
            <td>{{ reserva.planet?.nombre || 'N/A' }}</td>
            <td>{{ reserva.passengers || 'N/A' }}</td>
            <td>{{ reserva.date ? formatDate(reserva.date) : 'N/A' }}</td>
          </tr>
          <tr v-if="!reservas || reservas.length === 0">
            <td colspan="3" class="no-reservations">No hay reservas realizadas</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanetsStore } from '@/stores/planets'

const router = useRouter()
const store = usePlanetsStore()

// Datos del formulario
const pasajeros = ref(1)
const mesSeleccionado = ref('Enero')

// Obtener datos del store
const selectedPlanet = computed(() => store.selectedPlanet)
const reservas = computed(() => {
  if (!store.reservations) return []
  return store.reservations.filter(r => r?.planet?.id === selectedPlanet.value?.id)
})

// Verificar si se puede reservar
const canBook = computed(() => {
  return pasajeros.value >= 1 && pasajeros.value <= 10
})

// Obtener el número del mes seleccionado (1-12)
const mesSeleccionadoNumero = computed(() => {
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return meses.indexOf(mesSeleccionado.value) + 1
})

// Verificar si el mes seleccionado es óptimo
const esMesOptimo = computed(() => {
  if (!selectedPlanet.value?.mesOptimo) return true
  return mesSeleccionadoNumero.value === selectedPlanet.value.mesOptimo
})

// Calcular descuento por grupo
const calculateDiscount = () => {
  if (pasajeros.value <= 1) return 0;
  // 5% de descuento por cada pasajero adicional, hasta 20% (4 pasajeros)
  return Math.min(pasajeros.value - 1, 4) * 0.05;
}

// Calcular precio total con recargos y descuentos
const calculateTotalPrice = () => {
  if (!selectedPlanet.value) return 0;
  
  let precio = selectedPlanet.value.precio * pasajeros.value;
  
  // Aplicar recargo del 10% si no es el mes óptimo
  if (!esMesOptimo.value) {
    precio *= 1.10;
  }
  
  // Aplicar descuento por grupo
  const descuento = calculateDiscount();
  if (descuento > 0) {
    precio *= (1 - descuento);
  }
  
  return Math.round(precio * 100) / 100; // Redondear a 2 decimales
}

// Computed para el precio total
const precioTotal = computed(() => calculateTotalPrice());

// Redirigir si no hay planeta seleccionado
onMounted(() => {
  if (!selectedPlanet.value) {
    router.push('/destinos')
  }
})

// Formatear fecha para mostrar en la tabla
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Obtener nombre del mes óptimo
function getMesOptimoNombre() {
  if (!selectedPlanet.value?.mesOptimo) return 'Todo el año'
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return meses[selectedPlanet.value.mesOptimo - 1] || 'No especificado'
}

// Obtener tooltip con información de meses óptimos
function getOptimalMonthsTooltip() {
  if (!selectedPlanet.value?.mesOptimo) return 'No hay restricciones de temporada para este destino.'
  return `Recomendado viajar en ${getMesOptimoNombre()} para las mejores condiciones.`
}

// Confirmar reserva
async function confirmarReserva() {
  if (!canBook.value || !selectedPlanet.value) return
  
  // Mostrar advertencia si no es el mes óptimo
  if (!esMesOptimo.value) {
    const confirmar = window.confirm(
      '⚠️ Atención: Estás reservando fuera de la temporada óptima. ' +
      'Se aplicará un recargo del 10% al precio base.\n\n' +
      '¿Deseas continuar con la reserva?'
    )
    
    if (!confirmar) return
  }
  
  // Agregar la reserva con el mes de viaje
  store.addReservation(selectedPlanet.value, pasajeros.value, mesSeleccionadoNumero.value)
  
  // Mostrar confirmación
  alert(`¡Reserva confirmada para ${selectedPlanet.value.nombre} en ${mesSeleccionado.value}!\n\n` +
        `Precio total: ${precioTotal.value.toLocaleString('es-ES')} €` + 
        (!esMesOptimo.value ? ' (incluye 10% de recargo por temporada alta)' : ''))
  
  // Reiniciar formulario
  pasajeros.value = 1
  mesSeleccionado.value = 'Enero'
  
  // Redirigir a la vista de reservas confirmadas
  router.push('/reservas')
}
</script>

<style scoped>
/* Estilos base */
.reserva-view {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}

/* Encabezado */
.reserva-view h1 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f2f5;
}

/* Contenedor principal */
.reservation-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Secciones */
.reservation-section {
  flex: 1;
  min-width: 0; /* Para evitar problemas con flexbox */
}

.planet-info,
.reservation-form {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Estilos para las tarjetas */
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card-header {
  background-color: #f8f9fa;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.card-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
}

/* Cuadrícula de información */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.info-label {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.info-value {
  font-size: 1.05rem;
  color: #2c3e50;
  font-weight: 500;
}

/* Contenedor de bandera */
.flag-container {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.flag {
  max-width: 200px;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Títulos de sección */
h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f0f2f5;
}

/* Tabla de información */
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.info-table th,
.info-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
  vertical-align: top;
}

.info-table th {
  width: 30%;
  color: #6c757d;
  font-weight: 500;
}

/* Formulario */
.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

input[type="number"],
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="number"]:focus,
select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Botones */
.btn {
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
}

.btn-primary {
  color: white;
  background-color: #3498db;
  border-color: #3498db;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-secondary {
  color: #6c757d;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-secondary:hover {
  background-color: #e2e6ea;
  border-color: #dae0e5;
}

/* Estilos para la información de temporada óptima */
.optimal-months {
  font-weight: 600;
  color: #2c3e50;
}

.info-tooltip {
  margin-left: 8px;
  cursor: help;
  font-size: 0.9em;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.info-tooltip:hover {
  opacity: 1;
}

/* Badges para indicar estado de temporada */
.warning-badge,
.success-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
  margin-left: 10px;
  vertical-align: middle;
}

.warning-badge {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.success-badge {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

/* Estilos para el resumen de precios */
.selection-summary {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selection-summary h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.selection-summary p {
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
}

.price-detail {
  font-size: 0.9em;
  color: #6c757d;
  padding-left: 20px;
}

.total-price {
  font-weight: 600;
  font-size: 1.1em;
  margin-top: 15px !important;
  padding-top: 10px;
  border-top: 2px solid #dee2e6;
}

/* Estilos responsivos */
@media (max-width: 992px) {
  .reserva-view {
    padding: 10px;
  }
  
  .planet-info,
  .reservation-form,
  .selection-summary {
    padding: 1.25rem;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  h2 {
    font-size: 1.4rem;
  }
}

/* Estilos para móviles */
@media (max-width: 768px) {
  .reserva-view {
    padding: 8px;
  }
  
  .planet-info,
  .reservation-form,
  .selection-summary {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  
  .info-table th,
  .info-table td {
    padding: 0.5rem;
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  
  .info-table th {
    padding-bottom: 0.25rem;
    font-size: 0.9em;
  }
  
  .info-table td {
    padding-top: 0.25rem;
    padding-bottom: 1rem;
  }
  
  .info-table tr:last-child td {
    padding-bottom: 0;
  }
  
  .selection-summary p {
    flex-direction: column;
    margin: 0.75rem 0;
  }
  
  .warning-badge,
  .success-badge {
    display: block;
    margin: 5px 0 0 0;
    width: fit-content;
    font-size: 0.8em;
    padding: 2px 10px;
  }
  
  .btn {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.75rem;
  }
  
  .btn-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .month-selector select {
    font-size: 1rem;
    padding: 0.6rem;
  }
  
  .price-detail {
    padding-left: 0;
    font-size: 0.85em;
  }
  
  .total-price {
    font-size: 1.1em;
    margin-top: 1rem !important;
  }
}

.no-selection {
  text-align: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

/* Estilos para el selector de mes */
.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.month-nav {
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.month-nav:hover:not(:disabled) {
  background-color: #45a049;
}

.month-nav:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.month-selector h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2em;
}

/* Estilos para el calendario */
.calendar {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #4CAF50;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
}

.weekday {
  padding: 5px;
}

.days {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background-color: #f0f0f0;
}

.day {
  min-height: 80px;
  padding: 8px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.day:hover:not(.past) {
  background-color: #f8f9fa;
  transform: scale(1.02);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.day.available {
  border-left: 3px solid #4CAF50;
}

.day.available:hover:not(.past) {
  background-color: #e8f5e9;
}

.day.selected {
  background-color: #e3f2fd;
  border: 2px solid #2196F3;
  transform: scale(1.03);
  z-index: 2;
}

.day.today {
  background-color: #fff8e1;
}

.day.past {
  background-color: #f9f9f9;
  color: #999;
  cursor: not-allowed;
}

.day-number {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 4px;
}

.day-price {
  font-size: 0.85em;
  color: #388e3c;
  font-weight: bold;
  background-color: #e8f5e9;
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
}

.day-unavailable {
  font-size: 0.75em;
  color: #d32f2f;
  font-style: italic;
  text-align: center;
  margin-top: 4px;
}

/* Resumen de selección */
.selection-summary {
  background-color: #f5f9ff;
  border-left: 4px solid #2196F3;
  padding: 15px;
  margin: 20px 0;
  border-radius: 0 8px 8px 0;
}

.selection-summary h3 {
  margin-top: 0;
  color: #1976D2;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.selection-summary p {
  margin: 8px 0;
  color: #333;
}

.selection-summary strong {
  color: #0d47a1;
}

/* Formulario de reserva */
.booking-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-primary:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

/* Tabla de reservas */
.reservas-previas {
  margin-top: 40px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.reservas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.reservas-table th,
.reservas-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.reservas-table th {
  background-color: #f5f7fa;
  color: #2c3e50;
  font-weight: 600;
}

.reservas-table tr:hover {
  background-color: #f8f9fa;
}

.price {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #2c3e50;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .month-selector {
    padding: 8px;
  }
  
  .month-selector h3 {
    font-size: 1em;
  }
  
  .day {
    min-height: 70px;
    padding: 5px;
  }
  
  .day-price {
    font-size: 0.7em;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .days {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .weekdays {
    display: none;
  }
  
  .day {
    min-height: auto;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .day-number {
    margin-bottom: 0;
    margin-right: 10px;
  }
  
  .day-price, .day-unavailable {
    margin-top: 0;
  }
}

.planet-info,
.reservation-form,
.reservas-previas {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

.info-table th,
.info-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.info-table th {
  width: 30%;
  color: #666;
}

.flag {
  max-width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.reservas-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.reservas-table th,
.reservas-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.reservas-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.reservas-table tr:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .planet-info,
  .reservation-form,
  .reservas-previas {
    padding: 15px;
  }
  
  .btn {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
