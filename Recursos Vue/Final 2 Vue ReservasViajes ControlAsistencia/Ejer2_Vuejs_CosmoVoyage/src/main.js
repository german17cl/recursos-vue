// Importar estilos globales
import './assets/styles/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Añadir clase al body para estilos globales
document.body.classList.add('app-body')

app.mount('#app')
