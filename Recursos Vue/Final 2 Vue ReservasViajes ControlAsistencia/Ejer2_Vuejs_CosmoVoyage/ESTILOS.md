# Guía Rápida de Estilos

## Estructura Básica

```vue
<template>
  <div class="view-content">
    <div class="container">
      <h1>Título Principal</h1>
      
      <!-- Contenido aquí -->
      
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos de esta vista */
</style>
```

## Clases Principales

### Contenedores
- `.container`: Centra el contenido (1200px max)
- `.card`: Crea una tarjeta con sombra
- `.card-body`: Contenido de la tarjeta

### Botones
```html
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-success">Éxito</button>
<button class="btn btn-danger">Peligro</button>
<button class="btn btn-warning">Advertencia</button>
```

### Formularios
```html
<div class="form-group">
  <label>Nombre:</label>
  <input type="text" class="form-control">
</div>

<select class="form-control">
  <option>Opción 1</option>
</select>

<textarea class="form-control"></textarea>
```

### Alertas
```html
<div class="alert alert-success">¡Éxito!</div>
<div class="alert alert-warning">Advertencia</div>
<div class="alert alert-danger">Error</div>
<div class="alert alert-info">Información</div>
```

### Espaciado
- `.mt-1` a `.mt-5`: Márgenes superiores
- `.mb-1` a `.mb-5`: Márgenes inferiores
- `.p-1` a `.p-5`: Rellenos

### Alineación de texto
- `.text-center`: Centrado
- `.text-right`: Derecha
- `.text-left`: Izquierda

### Ejemplo Completo

```vue
<template>
  <div class="view-content">
    <div class="container">
      <h1>Registro de Usuario</h1>
      
      <div class="card mb-4">
        <div class="card-body">
          <h2>Datos Personales</h2>
          
          <form>
            <div class="form-group">
              <label>Nombre:</label>
              <input type="text" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control">
            </div>
            
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button type="button" class="btn btn-secondary">Cancelar</button>
          </form>
        </div>
      </div>
      
      <div class="alert alert-info">
        Todos los campos son obligatorios.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos de esta vista */
.card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
```

## Consejos Rápidos
1. Usa `view-content` como contenedor principal
2. Dentro, usa `container` para centrar el contenido
3. Agrupa elementos relacionados en `card`
4. Usa `form-group` para los campos de formulario
5. Los estilos son responsivos automáticamente
