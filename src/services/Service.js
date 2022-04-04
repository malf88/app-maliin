import axios from 'axios'
import { getToken } from './AuthService'

const service = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
})

service.interceptors.request.use(async (config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers['Access-Control-Max-Age'] = 86400
  }
  return config
})

export default service
