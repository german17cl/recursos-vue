<template>
  <div class="home-view">
    <h1>¡Explora el universo con CosmoVoyage!</h1>
    
    <div class="welcome-message">
      <p>Descubre los destinos más increíbles del cosmos y vive la aventura de tu vida.</p>
    </div>
    
    <div class="featured-planets">
      <h2>Destinos Destacados</h2>
      
      <div class="carousel">
        <button 
          class="carousel-button prev" 
          @click="prevSlide"
          :disabled="currentSlide === 0"
          aria-label="Anterior"
        >
          &larr;
        </button>
        
        <div class="carousel-track">
          <div 
            class="carousel-slide" 
            v-for="(planet, index) in featuredPlanets" 
            :key="planet.id"
            :class="{ active: currentSlide === index }"
          >
            <div class="planet-card">
              <div class="planet-image">
                <img 
                  :src="`/images/${planet.bandera}`" 
                  :alt="`Bandera de ${planet.nombre}`"
                >
              </div>
              <h3>{{ planet.nombre }}</h3>
              <p class="planet-description">{{ planet.descripcion || 'Un destino increíble en el cosmos' }}</p>
              <div class="planet-details">
                <span class="climate">{{ planet.clima }}</span>
                <span class="distance">{{ planet.distancia }} años luz</span>
              </div>
              <router-link 
                to="/destinos" 
                class="explore-btn"
              >
                Explorar
              </router-link>
            </div>
          </div>
        </div>
        
        <button 
          class="carousel-button next" 
          @click="nextSlide"
          :disabled="currentSlide === featuredPlanets.length - 1"
          aria-label="Siguiente"
        >
          &rarr;
        </button>
      </div>
      
      <div class="carousel-dots">
        <button
          v-for="(_, index) in featuredPlanets"
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :aria-label="`Ir al destino ${index + 1}`"
        ></button>
      </div>
    </div>
    
    <div class="cta-section">
      <h2>¿Listo para tu próxima aventura espacial?</h2>
      <router-link to="/destinos" class="cta-button">
        Ver todos los destinos
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const featuredPlanets = ref([]);
const currentSlide = ref(0);

// Cargar planetas destacados al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('/json/planetas.json');
    // Seleccionar 3 planetas aleatorios
    const shuffled = [...response.data].sort(() => 0.5 - Math.random());
    featuredPlanets.value = shuffled.slice(0, 3);
  } catch (error) {
    console.error('Error al cargar los planetas destacados:', error);
  }
});

// Navegación del carrusel
const nextSlide = () => {
  if (currentSlide.value < featuredPlanets.value.length - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.welcome-message {
  margin-bottom: 40px;
}

.welcome-message p {
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.featured-planets {
  margin: 40px 0;
  position: relative;
}

.featured-planets h2 {
  margin-bottom: 30px;
  color: #34495e;
  font-size: 2rem;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1000px;
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  overflow: hidden;
}

.carousel-slide {
  min-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  transition: opacity 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.carousel-slide.active {
  position: relative;
  opacity: 1;
}

.planet-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.planet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.planet-image {
  width: 200px;
  height: 150px;
  margin: 0 auto 20px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.planet-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.planet-card h3 {
  color: #2c3e50;
  margin: 15px 0 10px;
  font-size: 1.8rem;
}

.planet-description {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
  min-height: 60px;
}

.planet-details {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
  color: #666;
}

.climate,
.distance {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.climate::before {
  content: '🌡️';
  margin-right: 5px;
}

.distance::before {
  content: '🚀';
  margin-right: 5px;
}

.explore-btn {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.explore-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.carousel-button {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: background-color 0.3s ease;
}

.carousel-button:hover {
  background: rgba(0, 0, 0, 0.1);
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #3498db;
}

.cta-section {
  margin: 60px 0 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
}

.cta-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.cta-button {
  display: inline-block;
  background-color: #e74c3c;
  color: white;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .carousel {
    padding: 0 10px;
  }
  
  .planet-card {
    padding: 15px;
  }
  
  .planet-image {
    width: 150px;
    height: 120px;
  }
  
  .cta-button {
    padding: 10px 25px;
    font-size: 1rem;
  }
}
</style>
