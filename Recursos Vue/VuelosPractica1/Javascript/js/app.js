// Toda la lógica de la aplicación se encuentra en este archivo, app.js

const btn = document.getElementById("calcular")

btn.addEventListener("click", calcularTotal)

function calcularTotal() {
    const codigoVueloInput = document.getElementById("codigo")
    const claseSelect = document.getElementById("clase")
    const pesoInput = document.getElementById("peso")

    const codigo = codigoVueloInput.value.trim()
    const clase = claseSelect.value
    const peso = pesoInput.value.trim()

    const mensajeError = document.getElementById("resultado")

    mensajeError.textContent = ""

    const regexCodigo = /^[A-Za-z\s]+$/

    if(!regexCodigo.test(codigo)){
        mensajeError.textContent =
        "Código de vuelo no válido. Formato: AA1234"
        return
    }

    if(peso < 0){
        mensajeError.textContent =
        "El peso debe ser un número positivo"
    }

    const reserva = new Reserva(codigo, clase, peso)

    const field = document.createElement("div")
    field.id = "field"

    

    const total = CargoPorExceso + CargoPorClase

    const totalElemento = document.createElement("h2")
    totalElemento.textContent = "Exceso: ", total, " kg"


    field.appendChild(totalElemento)

    document.getElementById("resultado").appendChild(field)

    codigoVueloInput.value = ""
    pesoInput.value = ""

}