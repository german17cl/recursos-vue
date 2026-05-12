//Funciones de validación

// Solo de la a-z en minúscula
function isValidUsername(username) {
return /^[a-z]+$/.test(username);
}
// Debe contener una mayúscula, una minúscula y un número
function isValidPassword(password) {
return /^( ?=.* \d)( ?=.* [a-z])( ?=.* [A-Z]) .* $/.test(password);
}

// El número de teléfono debe de estar en el formato +00 000 000 000
function isValidTelephone(telephone) {
return /^[+]\d{1,2}\s\d{3}\s\d{3}\s\d{3}$/.test(telephone);

}

// Tiene que ser una direción de email válida
function isValidEmail(email) {
return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Solo puede contener letras, números, guiones y guiones bajos
function isValidUsername(username) {
return /^[a-zA-Z0-9_-]+$/.test(username);
}


// ================================
// 🧠 EXPRESIONES REGULARES ÚTILES
// ================================

const REGEX = {
    // 📍 Código vuelo: AA1234 (2 mayúsculas + 4 números)
    codigoVuelo: /^[A-Z]{2}\d{4}$/,

    // 📍 Solo letras (nombres, ciudades)
    soloLetras: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,

    // 📍 Número entero positivo
    enteroPositivo: /^\d+$/,

    // 📍 Número decimal positivo (ej: 10.5)
    decimalPositivo: /^\d+(\.\d+)?$/,

    // 📍 Email básico
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // 📍 DNI español (8 números + letra)
    dni: /^\d{8}[A-Z]$/,

    // 📍 Teléfono español (9 dígitos)
    telefono: /^\d{9}$/,

    // 📍 Contraseña fuerte (mín 8 chars, 1 mayúscula, 1 número)
    passwordFuerte: /^(?=.*[A-Z])(?=.*\d).{8,}$/,

    // 📍 Código postal España (5 dígitos)
    codigoPostal: /^\d{5}$/
}

//Como usaralo:
if (!REGEX.codigoVuelo.test(codigo)) {
    resultado.textContent = "Código inválido"
    return
}