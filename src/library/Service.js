import axios from 'axios'
import { logout, TOKEN_KEY } from '../componentes/User/UserActions'

export const getServiceWithToken = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem(TOKEN_KEY),
  }
  let obj = {
    baseURL: process.env.REACT_APP_URL_API,
  }
  if (process.env.REACT_APP_PHP_DEBUG === 'true') {
    obj = {
      ...obj,
      params: { XDEBUG_SESSION: 'PHPSTORM' },
    }
  }
  let servico = axios.create(obj)
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
  let obj = {
    baseURL: process.env.REACT_APP_URL_API,
  }
  if (process.env.REACT_APP_PHP_DEBUG === 'true') {
    obj = {
      ...obj,
      params: { XDEBUG_SESSION: 'PHPSTORM' },
    }
  }
  return axios.create(obj)
}

export const getServiceDownloadWithToken = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/octet-stream',
    Authorization: 'Bearer ' + sessionStorage.getItem(TOKEN_KEY),
  }
  let obj = {
    baseURL: process.env.REACT_APP_URL_API,
  }
  if (process.env.REACT_APP_PHP_DEBUG === 'true') {
    obj = {
      ...obj,
      params: { XDEBUG_SESSION: 'PHPSTORM' },
    }
  }
  let servico = axios.create(obj)
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
