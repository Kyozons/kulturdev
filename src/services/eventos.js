import axios from 'axios'

export class Eventos {
  static ObtenerEventos(){
    return axios.get(`${import.meta.env.VITE_APP_SERVER_URL}`)
  }

  static GuardarEvento(evento){
    return axios.post(`${import.meta.env.VITE_APP_SERVER_URL}`, evento)
  }

  static ActualizarEvento(evento){
    return axios.put(`${import.meta.env.VITE_APP_SERVER_URL}${evento.id}`, evento)
  }

  static EliminarEvento(evento){
    return axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}${evento.id}`)
  }
}
