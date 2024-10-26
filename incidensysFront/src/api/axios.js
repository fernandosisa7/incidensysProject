import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true  //configuracion para q el backend pueda setear las cookies a front
})

export default instance