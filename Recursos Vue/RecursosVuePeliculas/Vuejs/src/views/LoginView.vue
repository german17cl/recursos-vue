<template>
    <div class="login-view">
        <h1>Iniciar Sesión</h1>

        <form @submit.prevent="login">
            <label for="email">Email:</label>
            <input type="email" v-model="email" placeholder="usuario@ejemplo.com" required>

            <label for="password">Contraseña:</label>
            <input type="password" v-model="password" placeholder="********" required>

            <button type="submit">Iniciar sesión</button>
        </form>

        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePeliculasStore } from '../stores/usePeliculasStore'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const store = usePeliculasStore()

async function login() {
    error.value = ''

    // Cargar datos si no están cargados
    await store.cargarDatos()

    // Buscar usuario
    const usuario = store.getUsuarioByEmail(email.value)

    if (!usuario || usuario.password !== password.value) {
        error.value = 'Usuario o contraseña incorrectos'
        return
    }

    // Guardar usuario logueado en el store
    store.usuarioActivo = usuario

    // Redirigir a Home
    router.push('/')
}
</script>

<style scoped>
.login-view {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
}

h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #1e3c72;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    background-color: #1e3c72;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #2a5298;
}

.error {
    margin-top: 1rem;
    color: red;
    font-weight: bold;
    text-align: center;
}
</style>
