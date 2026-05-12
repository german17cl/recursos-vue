<template>
  <div class="consulta-container">

    <h1>Consultar vuelos</h1>

    <!-- FORMULARIO -->
     <div class="form-box">
      <input v-model="email" placeholder="Email">
      <input v-model="codigo" placeholder="Código reserva (opcional)">

      <button @click="consultar">Consultar</button>
    </div>

    <!-- RESULTADOS -->
    <table v-if="resultado.length">
      <thead>
        <tr>
          <th>Código vuelo</th>
          <th>Origen</th>
          <th>Destino</th>
          <th>Fecha</th>
          <th>Duración</th>
          <th>Pasajeros</th>
          <th>Código reserva</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in resultado" :key="r.codigoReserva">
          <td>{{ r.vuelo.codigo }}</td>
          <td>{{ r.vuelo.origen }}</td>
          <td>{{ r.vuelo.destino }}</td>
          <td>{{ r.vuelo.fechaSalida }} {{ r.vuelo.horaSalida }}</td>
          <td>{{ formatearDuracion(r.vuelo.duracion) }}</td>
          <td>{{ r.pasajeros }}</td>
          <td>{{ r.codigoReserva }}</td>
          <td>
            <button @click="verDetalle(r.vuelo.codigo)">
                Ver detalle
            </button>
        </td>
        </tr>
      </tbody>
    </table>

    <!-- MENSAJE -->
    <p v-else-if="buscado" class="mensaje">
      No hay resultados para esa búsqueda
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVuelosStore } from '../stores/vuelos'
import { useRouter } from 'vue-router'


const router = useRouter()

const store = useVuelosStore()

const email = ref('')

const codigo = ref('')

const resultado = ref([])

const buscado = ref(false)

  function consultar(){
    buscado.value = true

    if(codigo.value){
      const r = store.reservas.find(r =>
        r.email === email.value && r.codigoReserva === codigo.value
      )
      resultado.value = r ? [r] : []
    } else {
      resultado.value = store.reservas.filter(r =>
      r.email === email.value
      )
    }
  }

  function formatearDuracion(min){
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}h ${m}m`
  }

  function verDetalle(codigo){
    router.push(`/vuelos/${codigo}`)
  }

</script>


  <style>
    td button {
  background-color: #0288d1;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
}

td button:hover {
  background-color: #026aa7;
}
.consulta-container {
  padding: 2rem;
}

/* FORMULARIO */
.form-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-box input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
}

.form-box button {
  background: #0288d1;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
}

.form-box button:hover {
  background: #026aa7;
}

/* TABLA (MISMO ESTILO QUE ANTES) */
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

thead {
  background: linear-gradient(135deg, #0288d1, #26c6da);
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
}

tr:hover {
  background-color: #f5f9fc;
}

td:first-child {
  font-weight: bold;
  color: #0288d1;
}

/* MENSAJE */
.mensaje {
  margin-top: 20px;
  font-weight: 500;
  color: #666;
}
</style>