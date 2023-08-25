import axios from 'axios'
import config from '../config/default.json'
import cookieService from './cookie.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: config.apiEndpoint
})

http.interceptors.request.use(
  async function(config) {
    const accessToken = cookieService.getAccessToken()

    if (!accessToken)
      await authService.refresh()


    config.headers = {
      ...config.headers,
      authorization: `Bearer ${cookieService.getAccessToken()}`
    }

    return config
  }, function(e) {
    return Promise.reject(e)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService