import axios from 'axios'
import { logout, TOKEN_KEY } from '../componentes/User/UserActions'

export const getServiceWithToken = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem(TOKEN_KEY),
  }
  let servico = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
  })
  servico.interceptors.response.use(
    (response) => response,
    (error) => {
      const statusCode = error.response ? error.response.status : null
      if (statusCode === 401) {
        logout()
        window.location.href = '/'
      }
      return Promise.reject(error)
    },
  )
  return servico
}

export const getServiceWithoutToken = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
  }
  return axios.create({
    baseURL: process.env.REACT_APP_URL_API,
  })
}
