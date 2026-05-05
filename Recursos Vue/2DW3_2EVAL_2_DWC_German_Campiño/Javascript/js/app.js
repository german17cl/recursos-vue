const btn = document.getElementById("calcular")

btn.addEventListener("click", calcularTotal)

function calcularTotal() {
    const codigo = document.getElementById("codigo").value.trim()
    const clase = document.getElementById("clase").value
    const peso = parseFloat(document.getElementById("peso").value)
    const resultado = document.getElementById("resultado")

    resultado.innerHTML = ""

    // VALIDACIÓN CÓDIGO 
    // El código debe tener el formato AA9999 (2 letras mayúsculas seguidas de 4 dígitos)
    const regexCodigo = /^[A-Z]{2}\d{4}$/
    if (!regexCodigo.test(codigo)) {
        resultado.textContent = "Código inválido (AA9999)"
        return
    }

    // VALIDACIÓN PESO
    if (isNaN(peso) || peso <= 0 || peso >= 100) {
        resultado.textContent = "El peso debe estar entre 0 y 100 kg"
        return
    }

    // CREAR OBJETO
    const reserva = new Reserva(codigo, clase, peso)

    // CÁLCULOS

    // Exceso de equipaje: 20 kg gratis, cada kg extra 10 €
    const exceso = Math.max(0, peso - 20)
    
    const cargoExceso = exceso * 10

    // Cargo clase Business: 50 €, Economy: 0 €
    const cargoClase = clase === "Business" ? 50 : 0
    
    const total = cargoExceso + cargoClase

    // Párrafo 1: exceso
    const p1 = document.createElement("p")
    p1.textContent = `Exceso de equipaje: ${exceso} kg`

    // Párrafo 2: precio
    const p2 = document.createElement("p")
    p2.textContent = `Precio total: ${total} €`

    // color según regla
    p2.style.color = total === 0 ? "green" : "red"

    resultado.appendChild(p1)
    resultado.appendChild(p2)

    // limpiar inputs
    document.getElementById("codigo").value = ""
    document.getElementById("peso").value = ""
}