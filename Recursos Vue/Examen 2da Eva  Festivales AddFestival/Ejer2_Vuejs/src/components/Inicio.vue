<template>
  <div class="inicio-container">
    <div class="festival-header">
      <h1>🎉 Festival Hub</h1>
      <p class="tagline">Tu portal para descubrir los mejores festivales</p>
    </div>
    
  </div>
</template>

<script setup>
// No se necesitan imports ni lógica adicional para este componente
</script>

<style scoped>
.inicio-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #4f46e5;
}

.festival-header {
  text-align: center;
  margin-bottom: 3rem;
}

.festival-header h1 {
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.tagline {
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.stat-card h3 {
  color: #1e293b;
  margin: 0.5rem 0;
}

.stat-card p {
  color: #64748b;
}

.featured-section {
  background: #f1f5f9;
  border-radius: 16px;
  padding: 2rem;
}

.featured-section h2 {
  color: #1e293b;
  text-align: center;
  margin-bottom: 1.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.features-list li {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  margin: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .festival-header h1 {
    font-size: 2rem;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
  
  .tagline {
    font-size: 1.1rem;
  }
}
</style>
