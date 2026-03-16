<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/useAppStore'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const store = useAppStore()

async function login() {
    error.value = ''

    try {
        const res = await axios.get('/data/usuarios.json')

        const usuario = res.data.find(
            u => u.email === email.value &&
                u.password === password.value
        )

        if (!usuario) {
            error.value = 'Usuario o contraseña incorrectos'
            return
        }

        store.login(usuario)
        router.push('/')

    } catch (e) {
        error.value = 'Error cargando usuarios'
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>

        <input v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">

        <button @click="login">Entrar</button>

        <p v-if="error">{{ error }}</p>
    </div>
</template>
