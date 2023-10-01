<script setup >
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { ref, toRaw } from 'vue'
import moment from 'moment'
import { Eventos } from '/src/services/eventos'

const eventos = ref([])
const modalEditarEvento = ref(false)
const modalCrearEvento = ref(false)
const evento = ref({
  title: null,
  start: null,
  end: null,
  allDay: false,
})

const rules = {
  required: value => !!value || "Campo Obligatorio",
}

async function obtenerEventos() {
  try {
    let resp = await Eventos.ObtenerEventos()
    return resp.data
  } catch (e) {
    console.log('Error Cargar Eventos', e)
  }
}

async function guardarEvento(addInfo) {
  try {
    await Eventos.GuardarEvento(addInfo.event)
  } catch (e) {
    console.log('Error Guardar Evento', e)
  }
}

async function actualizarEvento(changeInfo) {
  try {
    await Eventos.ActualizarEvento(changeInfo.event)
  } catch (e) {
    console.log('Error Actualizar Evento', e)
  }
}

async function eliminarEvento(removeInfo) {
  try {
    await Eventos.EliminarEvento(removeInfo.event)
  } catch (e) {
    console.log('Error Eliminar Evento', e)
  }
}

var calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  resizable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateClick,
  eventClick: handleEventClick,
  events: obtenerEventos,
  eventsSet: handleEvents,
  eventAdd: guardarEvento,
  eventChange: actualizarEvento,
  eventRemove: eliminarEvento,
}

function handleEventClick(eventInfo) {
  if (confirm(`Eliminar evento '${eventInfo.event.title}'?`)) {
    eventInfo.event.remove()
  }
}

function editarEvento() {
  console.log('Editar Evento', evento)
}

function handleDateClick(eventInfo) {
  // modalCrearEvento.value = true
  let title = prompt('Nombre del Evento')
  let calendarApi = eventInfo.view.calendar

  calendarApi.unselect()

  if (title) {
    calendarApi.addEvent({
      title,
      start: eventInfo.startStr,
      end: eventInfo.endStr,
      allDay: eventInfo.allDay
    })
  }
}

function handleEvents(events) {
  eventos.value = events
}
</script>


<template>
  <h1>Eventos Kultur</h1>
  <FullCalendar :options='calendarOptions' height="100%">
    <template v-slot:eventContet='arg'>
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
  <v-dialog v-model="modalEditarEvento" width="500">
    <v-card>
      <v-card-title>Editar {{ evento.title }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="evento.title" label="Nombre Evento" :rules="[rules.required]"></v-text-field>
          <v-text-field type="date" v-model="evento.start" label="Fecha Inicio" :rules="[rules.required]"></v-text-field>
          <v-text-field type="date" v-model="evento.end" label="Fecha Término"></v-text-field>
          <v-checkbox v-model="evento.allDay" label="Evento dura todo el día"></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn class="ml-auto" @click="editarEvento" color="primary"
          :disabled="!evento.title || !evento.start">Guardar</v-btn>
        <v-btn class="ml-auto" @click="modalEditarEvento = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="modalCrearEvento" width="500">
    <v-card>
      <v-card-title>Crear un evento en el día {{ moment(evento.start).format('DD-MM-YYYY') }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="evento.title" label="Nombre Evento" :rules="[rules.required]"></v-text-field>
          <v-text-field type="date" v-model="evento.end" label="Fecha Término" :disabled="evento.allDay"></v-text-field>
          <v-checkbox v-model="evento.allDay" label="Evento dura todo el día"></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn class="ml-auto" @click="crearEvento" color="primary"
          :disabled="!evento.title || !evento.start">Guardar</v-btn>
        <v-btn class="ml-auto" @click="modalCrearEvento = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
