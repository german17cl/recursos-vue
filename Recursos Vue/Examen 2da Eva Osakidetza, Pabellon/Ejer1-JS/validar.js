window.onload = inicio;

function inicio() {
    document.getElementById("enviar").addEventListener("click", validarFormulario);
}
function validarFormulario() {
    const servicios = [];

    // Obtener los valores del formulario
    const servicio = document.getElementById('servicio').value;
    const pabellon = document.getElementById('pabellon').value;
    const mostrar = document.getElementById('mostrar').checked;

    // Validar nombre del servicio
    const regex = /^[a-zA-Z0-9-]+$/;
    if (!regex.test(servicio)) {
      alert('El nombre del servicio solo puede contener letras, números o guion alto.');
      return;
    }

    // Validar pabellón
    if (pabellones.indexOf(pabellon.toString()) === -1) {
      alert('Seleccione un pabellón válido.');
      return;
    }

    // Crear objeto Servicio
    const nuevoServicio = new Servicio(servicio, pabellon, mostrar);

    // Añadir objeto al array de servicios
    servicios.push(nuevoServicio);

    // Mostrar por consola el servicio creado
    console.log(nuevoServicio.mostrarInfo());
  }