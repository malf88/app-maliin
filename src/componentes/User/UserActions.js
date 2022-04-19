import { getServiceWithoutToken, getServiceWithToken } from '../../library/Service'

export const TOKEN_KEY = '@app-token'
export const USER_KEY = '@app-user'
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => sessionStorage.getItem(TOKEN_KEY)
export const logout = () => sessionStorage.clear()

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

export const authUser = async (formData, navigate) => {
  let errorMessage = ''
  await getServiceWithoutToken()
    .post(process.env.REACT_APP_URL_API + '/token', formData)
    .then(function (response) {
      sessionStorage.setItem(TOKEN_KEY, response.data.token)
      navigate('/')
    })
    .catch((error) => {
      errorMessage = error.response.data.message
    })
  return errorMessage
}
