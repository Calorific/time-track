import axios from 'axios'
import config from '../config/default.json'

const httpAuth = axios.create({
  baseURL: config.apiEndpoint + 'auth/'
})

const authService = {
  register: async payload => {
    const data = await httpAuth.post('signUp', payload)
    return data
  }
}

export default authService