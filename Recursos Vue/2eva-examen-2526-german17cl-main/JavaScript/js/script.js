// fichero script.js para manejar la validación  y lógica del carné de socio
configPersonajes = {
    "Doraemon": { color: "#2980b9", img: "img/doraemon.webp" },
    "Nobita": { color: "#f1c40f", img: "img/nobita.webp" },
    "Shizuka": { color: "#e84393", img: "img/shizuka.webp" },
    "Gigante": { color: "#d35400", img: "img/gigante.webp" },
    "Suneo": { color: "#2c3e50", img: "img/suneo.webp" }
};

const nombresProhibidos = Object.keys(configPersonajes)

const btn = document.getElementById("btnGenerar")

btn.addEventListener("click", generarCarne)

function generarCarne() {
    const nombreInput = document.getElementById("nombreSocio")
    const personajeSelect = document.getElementById("personaje")
    const vipCheckbox = document.getElementById("esVip")
    const mensajeError = document.getElementById("mensajeError")

    const nombre = nombreInput.value.trim()
    const personaje = personajeSelect.value
    const esVip = vipCheckbox.checked

    //Limpiar errores anteriores
    mensajeError.textContent = ""

    //Validaciones: 

    //Solamente letras y espacios
    const regexNombre = /^[A-Za-z\s]+$/

    if(!regexNombre.test(nombre)){
        mensajeError.textContent = 
        "Error: El nombre solo puede contener letras. "
        return
    }

    //Para que no se pueda llamar como un personaje: 

    if(nombresProhibidos.includes(nombre)){
        mensajeError.textContent = 
        "Error: El nombre no puede ser igual a de los personajes"
        return
    }

    //Creación del objeto

    const socio = new Socio(nombre, personaje, esVip)

    //Creación de la tarjeta en el DOM

    const tarjeta = document.createElement("div")
    tarjeta.id = "tarjeta"

    //Color del fondo desde config
    tarjeta.style.backgroundColor = configPersonajes[socio.personaje].color

    //Tomar la imagen desde la configuración
    const img = document.createElement("img")
    img.src = configPersonajes[socio.personaje].img
    img.alt = socio.personaje

    //Tomar el nombre
    const nombreElemento = document.createElement("h2")
    nombreElemento.textContent = socio.nombre

    
    

    //Tipo socio
    const tipoSocio = document.createElement("p")
    tipoSocio.textContent = socio.esVip
    ? "SOCIO VIP"
    : "SOCIO BÁSICO"


    //Añadir elementos con appendChild
    tarjeta.appendChild(img)
    tarjeta.appendChild(nombreElemento)
    tarjeta.appendChild(espacio)
    tarjeta.appendChild(tipoSocio)
    
    
    //Insertar la tarjeta
    document.getElementById("carne").appendChild(tarjeta)

    //Limpiar el formulario
    nombreInput.value = ""
    vipCheckbox.checked = false



}