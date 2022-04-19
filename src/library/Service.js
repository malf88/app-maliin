import axios from 'axios'
import { TOKEN_KEY } from '../componentes/User/UserActions'

export const getServiceWithToken = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem(TOKEN_KEY),
  }
  return axios.create({
    baseURL: process.env.REACT_APP_URL_API,
  })
}

export const getServiceWithoutToken = () => {
  axios.defaults.headers.common = {
    'Content-Type': 'application/json',
  }
  return axios.create({
    baseURL: process.env.REACT_APP_URL_API,
  })
}
