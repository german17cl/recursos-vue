<template>
  <div class="reservas-view">
    <h1>Mis Reservas</h1>
    
    <div v-if="reservas.length === 0" class="no-reservations">
      <p>Todavía no se ha realizado ninguna reserva</p>
      <router-link to="/destinos" class="btn btn-primary">
        Ver Destinos Disponibles
      </router-link>
    </div>
    
    <div v-else>
      <div class="reservations-list">
        <div v-for="reserva in reservas" :key="reserva.id" class="reservation-card">
          <div class="reservation-header">
            <h3>{{ reserva.planet.nombre }}</h3>
            <span class="reservation-date">{{ formatDate(reserva.date) }}</span>
          </div>
          
          <div class="reservation-details">
            <div class="detail">
              <span class="label">Fecha del viaje:</span>
              <span>{{ getMonthName(reserva.travelMonth) }} {{ new Date().getFullYear() }}</span>
              <span v-if="!isOptimalMonth(reserva)" class="badge warning">
                Fuera de temporada
              </span>
              <span v-else class="badge success">
                Mejor época
              </span>
            </div>
            
            <div class="detail">
              <span class="label">Número de pasajeros:</span>
              <span>{{ reserva.passengers }}</span>
            </div>
            
            <div class="price-summary">
              <div class="price-row">
                <span>Precio base:</span>
                <span>{{ formatPrice(reserva.planet.precio) }} €</span>
              </div>
              
              <div v-if="reserva.priceDetails.surcharge > 0" class="price-row">
                <span>Recargo (10% fuera de temporada):</span>
                <span class="warning">+{{ formatPrice(reserva.priceDetails.surcharge) }} €</span>
              </div>
              
              <div v-if="reserva.priceDetails.discount > 0" class="price-row">
                <span>Descuento ({{ calculateDiscountPercentage(reserva) }}%):</span>
                <span class="success">-{{ formatPrice(reserva.priceDetails.discount) }} €</span>
              </div>
              
              <div class="price-row total">
                <strong>Total a pagar:</strong>
                <strong>{{ formatPrice(reserva.totalPrice) }} €</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlanetsStore } from '@/stores/planets';

const router = useRouter();
const store = usePlanetsStore();

// Datos
const reservas = computed(() => store.reservations);
const totalGastado = computed(() => {
  return reservas.value.reduce((total, reserva) => total + reserva.totalPrice, 0);
});

// Métodos
function formatPrice(price) {
  return new Intl.NumberFormat('es-ES').format(price);
}

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

function getMonthName(monthNumber) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthNumber - 1] || '';
}

function isOptimalMonth(reserva) {
  return reserva.planet.mesOptimo === reserva.travelMonth;
}

function calculateDiscountPercentage(reserva) {
  if (reserva.passengers < 2) return 0;
  return Math.min((reserva.passengers - 1) * 5, 25);
}

function verDetalle(planetId) {
  router.push(`/destino/${planetId}`);
}
</script>

<style scoped>
.reservas-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.no-reservations {
  text-align: center;
  padding: 3rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 2rem 0;
}

.no-reservations p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #6c757d;
}

.reservations-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.reservations-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Tarjeta de reserva */
.reservation-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  transition: transform 0.2s, box-shadow 0.2s;
}

.reservation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Encabezado de la tarjeta */
.reservation-header {
  padding: 1.25rem 1.5rem;
  background: linear-gradient(90deg, #3498db, #2c3e50);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reservation-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.reservation-date {
  font-size: 0.9rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
}

/* Detalles de la reserva */
.reservation-details {
  padding: 1.5rem;
}

.detail {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.label {
  font-weight: 600;
  color: #495057;
  min-width: 160px;
  flex-shrink: 0;
}

/* Badges para estado */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 0.75rem;
}

.badge.warning {
  background-color: #fff3cd;
  color: #856404;
}

.badge.success {
  background-color: #d4edda;
  color: #155724;
}

/* Resumen de precios */
.price-summary {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #6c757d;
  font-size: 0.95rem;
}

.price-row:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
}

.price-row .warning {
  color: #e0a800;
  font-weight: 600;
}

.price-row .success {
  color: #28a745;
  font-weight: 600;
}

.price-row.total {
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  border-top: 2px solid #dee2e6;
}

/* Botones */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background-color: #3498db;
  border-color: #3498db;
  box-shadow: 0 2px 4px rgba(52, 152, 219, 0.3);
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .reservas-view {
    padding: 1.5rem 1rem;
  }
  
  h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  .reservation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1.25rem 1rem;
  }
  
  .reservation-header h3 {
    font-size: 1.4rem;
  }
  
  .reservation-date {
    align-self: flex-start;
  }
  
  .reservation-details {
    padding: 1.25rem 1rem;
  }
  
  .detail {
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1.25rem;
  }
  
  .label {
    min-width: 100%;
    margin-bottom: 0.25rem;
  }
  
  .price-summary {
    padding: 1rem;
  }
  
  .price-row {
    font-size: 0.9rem;
  }
  
  .price-row.total {
    font-size: 1.05rem;
  }
}
</style>
