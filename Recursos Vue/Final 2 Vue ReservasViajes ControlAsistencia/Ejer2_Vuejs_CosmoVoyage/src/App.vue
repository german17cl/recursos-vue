<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <h1 class="logo">CosmoVoyage</h1>
          <nav class="main-nav">
            <RouterLink to="/" class="nav-link">Inicio</RouterLink>
            <RouterLink to="/destinos" class="nav-link">Destinos</RouterLink>
            <RouterLink to="/reserva" class="nav-link">Hacer Reserva</RouterLink>
            <RouterLink to="/reservas" class="nav-link">Mis Reservas</RouterLink>
            <RouterLink to="/about" class="nav-link">Sobre Nosotros</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="container view-content">
        <RouterView />
      </div>
    </main>

    <footer class="app-footer">
      <div class="container">
        <p>2025 - CosmoVoyage - 2Final DWC</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Estilos específicos del componente App */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #42b983;
  --nav-hover: #e9ecef;
  --nav-active: #e1f5fe;
}

.app-header {
  background-color: #f8f9fa;  /* Fondo claro */
  color: #333;  /* Texto oscuro */
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
  border-bottom: 1px solid #e0e0e0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.75rem;
  margin: 0;
  color: white;
  font-weight: 700;
}

.main-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.nav-link {
  color: #2c3e50;  /* Azul oscuro */
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border-bottom: 3px solid transparent;
  display: block;
  font-size: 1.05rem;
  position: relative;
  white-space: nowrap;
  margin: 0 2px;
}

.nav-link:hover {
  color: #1a2634;  /* Azul más oscuro al pasar el ratón */
  background-color: #e9ecef;  /* Fondo gris claro al pasar el ratón */
  border-radius: 4px;
  text-decoration: none;
}

.router-link-active,
.router-link-exact-active {
  color: #1a2634;  /* Azul más oscuro para enlace activo */
  border-bottom-color: #2c3e50;  /* Borde inferior más oscuro */
  font-weight: 700;
  background-color: #e9ecef;  /* Fondo gris claro para el activo */
  border-radius: 4px 4px 0 0;
}

/* Asegurar que los enlaces tengan suficiente contraste */
.main-nav a {
  color: #2c3e50;  /* Color de texto oscuro */
  text-decoration: none;
}

.main-nav a:hover {
  color: #1a2634;  /* Color más oscuro al pasar el ratón */
  text-decoration: none;
}

/* Asegurar que el logo también tenga buen contraste */
.logo {
  color: #1a2634;  /* Color oscuro para el logo */
}

.app-footer {
  background-color: #2c3e50;
  color: rgba(255, 255, 255, 0.8);
  padding: 1.5rem 0;
  text-align: center;
  margin-top: auto;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .main-nav {
    justify-content: center;
  }
  
  .logo {
    margin-bottom: 0.5rem;
  }
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: white;
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 10px 0;
  background: linear-gradient(135deg, #2c3e50, #42b983);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-nav {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  padding: 10px 0;
  flex-wrap: wrap;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 5px;
}

.nav-link:hover {
  background-color: var(--nav-hover);
  transform: translateY(-2px);
}

.nav-link.active {
  background-color: var(--nav-active);
  color: var(--secondary-color);
  font-weight: 500;
}



.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-nav {
    gap: 5px;
  }
  
  .nav-link {
    padding: 8px 10px;
    min-width: 70px;
    font-size: 0.8rem;
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
  
  .nav-text {
    font-size: 0.7rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-nav {
    overflow-x: auto;
    justify-content: flex-start;
    padding: 10px 5px;
    -webkit-overflow-scrolling: touch;
  }
  
  .nav-link {
    padding: 6px 8px;
    min-width: 60px;
  }
  
  .nav-icon {
    font-size: 1.1rem;
  }
  
  .nav-text {
    font-size: 0.65rem;
  }
}
</style>
