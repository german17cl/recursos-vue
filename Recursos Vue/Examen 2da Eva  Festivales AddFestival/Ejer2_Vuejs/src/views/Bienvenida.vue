<template>
  <main class="bienvenida">
    <div class="hero">
      <h2>¡Bienvenido al Festival Hub! 🎉</h2>
      <p class="subtitle">Descubre los mejores festivales y eventos</p>
      <button class="cta-button" @click="goToFestivales">
        Ver Festivales 🎸
      </button>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToFestivales = () => {
  router.push('/festivales')
}
</script>

<style scoped>
.bienvenida {
  min-height: 100vh;
  padding: 2rem;
  background: #3498db;
  color: #ffffff;
}

.hero {
  text-align: center;
  padding: 4rem 1rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  color: #ffffff;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.cta-button {
  background: #e67e22;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 50px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.cta-button:hover {
  background: #d35400;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.cta-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
}
</style>
