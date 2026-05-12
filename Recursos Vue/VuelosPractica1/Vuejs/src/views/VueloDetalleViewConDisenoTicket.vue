<template>
    <div class="pelicula-detalle-view" v-if="vuelo">
        <button class="btn-volver" @click="volver">← Volver a la lista de vuelos</button>

        <div class="detalle-card">

            <div class="ticket-info">
                <h2>✈️ {{ vuelo.codigo }}</h2>

                <div class="ruta">
                    <span>{{ vuelo.origen }}</span>
                    <span class="flecha">→</span>
                    <span>{{ vuelo.destino }}</span>
                </div>

                <p><strong>Salida:</strong> {{ vuelo.fechaSalida }} {{ vuelo.horaSalida }}</p>
                <p><strong>Duración:</strong> {{ vuelo.duracion }} min</p>
                <p class="precio"><strong>{{ vuelo.precio }} €</strong></p>
            </div>

            <div class="ticket-divider"></div>

            <div class="ticket-reserva">
                <h3>🎟️ Reservar</h3>

                <input v-model="email" type="email" placeholder="Email">
                <input v-model.number="pasajeros" type="number" min="1">

                <p class="total">Total: {{ vuelo.precio * pasajeros }} €</p>

                <button @click="reservar">Reservar vuelo</button>

                <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVuelosStore } from '../stores/vuelos'

const store = useVuelosStore()
const route = useRoute()
const router = useRouter()


const email = ref('')
const pasajeros = ref(1)
const mensaje = ref('')

const vuelo = ref(null)

// Cargar película al montar
onMounted(async () => {
    await store.cargarDatos()
    const codigo = route.params.codigo
    vuelo.value = store.getVueloById(codigo)
})

function volver() {
    router.push('/vuelos')
}
function reservar() {
    if (!email.value || pasajeros.value < 1) {
        mensaje.value = 'Datos inválidos'
        return
    }

    const res = store.addReserva(email.value, vuelo.value, pasajeros.value)

    if (res.error) {
        mensaje.value = res.error
    } else {
        mensaje.value = 'Reserva realizada. Código: ' + res.codigoReserva
        email.value = ''
        pasajeros.value = 1
    }
}

</script>

<style scoped>
.pelicula-detalle-view {
    padding: 2rem 0;
}

.btn-volver {
    background: #1e3c72;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.detalle-card {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    background: #f8f8f8;
    padding: 1.5rem;
    border-radius: 8px;
}

.detalle-card img {
    max-width: 400px;
    width: 100%;
    border-radius: 6px;
    object-fit: cover;
}

.info {
    flex: 1;
}

.info h2 {
    margin-top: 0;
    color: #1e3c72;
}

.info button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #e74c3c;
    color: white;
}

.info button:hover {
    opacity: 0.9;
}

.login-msg {
    margin-top: 1rem;
    color: #555;
}

    .pelicula-detalle-view {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    /* BOTÓN VOLVER */
    .btn-volver {
    background: transparent;
    color: #0288d1;
    border: none;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 1.5rem;
    }

    /* TARJETA PRINCIPAL */
    .detalle-card {
    display: flex;
    width: 700px;
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    /* INFO VUELO */
    .ticket-info {
    flex: 1;
    padding: 1.5rem;
    }

    .ticket-info h2 {
    margin: 0;
    color: #0288d1;
    }

    /* RUTA */
    .ruta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.3rem;
    margin: 1rem 0;
    font-weight: bold;
    }

    .flecha {
    color: #aaa;
    }

    /* PRECIO */
    .precio {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-top: 1rem;
    }

    /* DIVISOR TIPO TICKET */
    .ticket-divider {
    width: 2px;
    background: repeating-linear-gradient(
        to bottom,
        #ccc,
        #ccc 6px,
        transparent 6px,
        transparent 12px
    );
    }

    /* RESERVA */
    .ticket-reserva {
    flex: 1;
    padding: 1.5rem;
    background: #f9fbfd;
    display: flex;
    flex-direction: column;
    gap: 10px;
    }

    /* INPUTS */
    .ticket-reserva input {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ddd;
    }

    /* TOTAL */
    .total {
    font-weight: bold;
    color: #0288d1;
    }

    /* BOTÓN */
    .ticket-reserva button {
    background: linear-gradient(135deg, #0288d1, #26c6da);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.2s;
    }

    .ticket-reserva button:hover {
    transform: scale(1.05);
    }

    /* MENSAJE */
    .mensaje {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #333;
    }
</style>
