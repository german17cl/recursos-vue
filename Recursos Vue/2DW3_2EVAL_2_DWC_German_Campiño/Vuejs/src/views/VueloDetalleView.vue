<template>
    <div class="pelicula-detalle-view" v-if="vuelo">
        

        <div class="detalle-container" v-if="vuelo">

            <div class="card">

                <div class="card-header">
                    <h2>Vuelo {{ vuelo.codigo }}</h2>
                    <span class="estado">Programado</span>
                </div>

                <div class="card-body">

                    <div class="grid">
                        <div>
                            <p class="label">ORIGEN</p>
                            <p>{{ vuelo.origen }}</p>
                        </div>

                        <div>
                            <p class="label">DESTINO</p>
                            <p>{{ vuelo.destino }}</p>
                        </div>

                        <div>
                            <p class="label">FECHA DE SALIDA</p>
                            <p>{{ vuelo.fechaSalida }}</p>
                        </div>

                        <div>
                            <p class="label">HORA</p>
                            <p>{{ vuelo.horaSalida }}</p>
                        </div>

                        <div>
                            <p class="label">DURACIÓN</p>
                            <p>{{ vuelo.duracion }} min</p>
                        </div>

                        <div>
                            <p class="label">PRECIO</p>
                            <p>{{ vuelo.precio }} €</p>
                        </div>
                    </div>

                    <div class="reserva-box">
                        <p><strong>Introduce tu email para reservar:</strong></p>
                        <input v-model="email" type="email" placeholder="usuario@ejemplo.com">

                        <p><strong>Número de pasajeros:</strong></p>
                        <input v-model.number="pasajeros" type="number" min="1">

                        <p class="precio-total">
                            Precio Total: {{ vuelo.precio * pasajeros }} €
                        </p>

                        <button class="btn-reservar" @click="reservar">
                            Reservar Vuelo
                        </button>

                        <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
                    </div>

                    <button class="btn-volver" @click="volver">Volver</button>

                </div>

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

.detalle-container {
    display: flex;
    justify-content: center;
    padding: 2rem;
}

/* TARJETA */
.card {
    width: 420px;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

/* HEADER */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #eaeaea;
}

.card-header h2 {
    margin: 0;
}

.estado {
    background: #d0e7ff;
    color: #1e88e5;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
}

/* BODY */
.card-body {
    padding: 1rem;
}

/* GRID DATOS */
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 1rem;
}

.label {
    font-size: 11px;
    color: gray;
    margin-bottom: 2px;
}

/* RESERVA */
.reserva-box {
    background: #efefef;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.reserva-box input {
    width: 100%;
    padding: 8px;
    margin: 5px 0 10px 0;
    border-radius: 6px;
    border: 1px solid #ccc;
}

/* PRECIO */
.precio-total {
    font-weight: bold;
    margin: 10px 0;
}

/* BOTÓN RESERVAR */
.btn-reservar {
    width: 100%;
    background: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-reservar:hover {
    background: #43a047;
}

/* VOLVER */
.btn-volver {
    width: 100%;
    background: transparent;
    border: 1px solid #ccc;
    padding: 10px;
    color:gray;
    border-radius: 6px;
    cursor: pointer;
}

/* MENSAJE */
.mensaje {
    margin-top: 10px;
    font-size: 13px;
}
</style>
