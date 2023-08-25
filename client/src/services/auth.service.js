import axios from 'axios'
import config from '../config/default.json'

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + 'auth/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authService = {
  register: async payload => {
    return await httpAuth.post('signup', payload)
  },
  logIn: async payload => {
    return await httpAuth.post('login', payload)
  },
  logOut: async () => {
    return await httpAuth.post('logout')
  },
  refresh: async () => {
    return await httpAuth.post('refresh')
  }
}

export default authService