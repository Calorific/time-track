import axios from 'axios'
import config from '../config/default.json'

const http = axios.create({
  baseURL: config.apiEndpoint
})

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}