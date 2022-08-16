import { getServiceWithoutToken, getServiceWithToken } from '../../library/Service'
import { toast } from 'react-toastify'

export const TOKEN_KEY = '@app-token'
export const USER_KEY = '@app-user'
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => sessionStorage.getItem(TOKEN_KEY)
export const logout = async () => {
  if (!getToken()) return
  getServiceWithToken()
    .put(process.env.REACT_APP_URL_API + '/auth/logout')
    .then(function (response) {
      //sessionStorage.clear()
    })
    .catch(function (error) {})
    .finally(function () {
      sessionStorage.clear()
    })
  window.location.href = '/login'
  sessionStorage.clear()
}

export const getUser = async () => {
  let userResponse
  await getServiceWithToken()
    .get(process.env.REACT_APP_URL_API + '/user')
    .then(function (response) {
      userResponse = response.data
    })
    .catch(function (error) {
      logout()
    })
  return userResponse
}

export const updateEmail = async (email, navigate) => {
  return getServiceWithToken()
    .patch('/auth/google/update', { email })
    .then(function (response) {
      sessionStorage.setItem(TOKEN_KEY, response.data.token)
      toast.success('Email vinculado com sucesso!')
      navigate('/')
    })
    .catch(function (error) {
      toast.error('Erro ao vincular email!')
    })
}
export const authUser = async (token, navigate) => {
  let errorMessage = ''
  await getServiceWithoutToken()
    .get(process.env.REACT_APP_URL_API + '/auth/google', { headers: { Authorization: token } })
    .then(function (response) {
      sessionStorage.setItem(TOKEN_KEY, response.data.token)
      navigate('/')
    })
    .catch((error) => {
      errorMessage = error.response.data.message
    })
  return errorMessage
}
