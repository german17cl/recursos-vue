// Clase Asistente
class Asistente {
    constructor(nombre, email, horaLlegada) {
        this.nombre = nombre;
        this.email = email;
        this.horaLlegada = horaLlegada;
    }

    // Método para generar una fila de tabla HTML
    fila() {
        const tr = document.createElement('tr');
        
        const tdNombre = document.createElement('td');
        tdNombre.textContent = this.nombre;
        
        const tdEmail = document.createElement('td');
        tdEmail.textContent = this.email;
        
        const tdHora = document.createElement('td');
        tdHora.textContent = this.horaLlegada;
        
        tr.appendChild(tdNombre);
        tr.appendChild(tdEmail);
        tr.appendChild(tdHora);
        
        return tr;
    }
}

// Array para almacenar los asistentes
const asistentes = [];

// Función para validar el formulario
function validarFormulario(nombre, email, hora) {
    const errores = [];
    
    // Validar nombre (solo letras y espacios)
    if (!nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        errores.push('El nombre solo puede contener letras y espacios.');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errores.push('Por favor, introduce un email válido.');
    }
    
    // Validar hora (entre 08:00 y 10:00)
    const [horas, minutos] = hora.split(':').map(Number);
    const horaEnMinutos = horas * 60 + minutos;
    const minHora = 8 * 60; // 08:00 en minutos
    const maxHora = 10 * 60; // 10:00 en minutos
    
    if (horaEnMinutos < minHora || horaEnMinutos > maxHora) {
        errores.push('La hora debe estar entre 08:00 y 10:00.');
    }
    
    return errores;
}

// Función para manejar el envío del formulario
function manejarEnvio(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const hora = document.getElementById('hora').value;
    
    // Validar los datos
    const errores = validarFormulario(nombre, email, hora);
    
    if (errores.length > 0) {
        // Mostrar errores en un alert
        alert(errores.join('\n'));
        return;
    }
    
    // Crear nuevo asistente
    const nuevoAsistente = new Asistente(nombre, email, hora);
    
    // Agregar a la tabla
    const tablaAsistentes = document.getElementById('tablaAsistentes');
    tablaAsistentes.appendChild(nuevoAsistente.fila());
    
    // Agregar al array de asistentes
    asistentes.push(nuevoAsistente);
    console.log('Lista de asistentes:', asistentes);
    
    // Reiniciar el formulario
    document.getElementById('formularioAsistencia').reset();
}

// Event listener para el envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioAsistencia');
    formulario.addEventListener('submit', manejarEnvio);
});
