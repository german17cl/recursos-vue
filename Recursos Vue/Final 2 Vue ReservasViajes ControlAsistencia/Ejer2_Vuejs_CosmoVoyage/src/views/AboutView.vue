<template>
  <div class="about">
    <div class="about-container">
      <header class="about-header">
        <h1>Bienvenido a <span class="highlight">CosmoVoyage</span></h1>
        <p class="tagline">Tu puerta de entrada a las estrellas</p>
      </header>
      
      <section class="about-content">
        <div class="about-section">
          <h2>Nuestra Misión</h2>
          <p>En CosmoVoyage, nuestro objetivo es hacer que la exploración espacial sea accesible para todos. Desde los amantes de la astronomía hasta los viajeros más aventureros, ofrecemos experiencias únicas a los destinos más fascinantes de nuestra galaxia.</p>
        </div>
        
        <div class="about-section">
          <h2>¿Por qué elegirnos?</h2>
          <div class="features">
            <div class="feature">
              <i class="fas fa-rocket"></i>
              <h3>Naves de Última Generación</h3>
              <p>Flota de naves equipadas con tecnología de propulsión cuántica para viajes seguros y cómodos.</p>
            </div>
            <div class="feature">
              <i class="fas fa-globe-americas"></i>
              <h3>Destinos Exclusivos</h3>
              <p>Descubre planetas con paisajes asombrosos y culturas fascinantes en toda la Vía Láctea.</p>
            </div>
            <div class="feature">
              <i class="fas fa-shield-alt"></i>
              <h3>Seguridad Garantizada</h3>
              <p>Sistemas de seguridad de última generación y tripulación altamente capacitada.</p>
            </div>
          </div>
        </div>
        
        <div class="about-section">
          <h2>Nuestro Equipo</h2>
          <p>Nuestro equipo está formado por expertos en viajes espaciales, ex-astronautas y apasionados de la exploración galáctica. Juntos, trabajamos para ofrecerte la mejor experiencia de viaje interestelar.</p>
        </div>
        
        <div class="cta-section">
          <h2>¿Listo para la aventura?</h2>
          <p>Explora nuestros destinos disponibles y reserva tu viaje hoy mismo.</p>
          <router-link to="/destinos" class="cta-button">Ver Destinos</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Script opcional para funcionalidades adicionales
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.about-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #00d2ff, #3a7bd5);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.highlight {
  color: #00d2ff;
  -webkit-text-fill-color: #00d2ff;
}

.tagline {
  font-size: 1.5rem;
  color: #a0a0ff;
  margin-top: 0;
}

.about-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.about-section h2 {
  color: #00d2ff;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.about-section h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #00d2ff, #3a7bd5);
  border-radius: 3px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.feature i {
  font-size: 2.5rem;
  color: #00d2ff;
  margin-bottom: 1rem;
  display: inline-block;
}

.feature h3 {
  color: #fff;
  margin: 1rem 0;
  font-size: 1.3rem;
}

.cta-section {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(0, 210, 255, 0.1);
  border-radius: 10px;
  margin-top: 4rem;
  border: 1px solid rgba(0, 210, 255, 0.2);
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 2rem;
  color: #e0e0ff;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, #00d2ff, #3a7bd5);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 210, 255, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2.2rem;
  }
  
  .tagline {
    font-size: 1.2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
  
  .about-section {
    padding: 1.5rem;
  }
}
</style>
