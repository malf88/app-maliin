import service from './Service'

export const TOKEN_KEY = '@app-token'
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null
export const getToken = () => sessionStorage.getItem(TOKEN_KEY)

export const login = (login, password, history) => {
  service.post('token', { email: login, password: password }).then((result) => {
    sessionStorage.setItem(TOKEN_KEY, result.data.token)
    history.push('/accounts')
  })
}
export const logout = (history) => {
  sessionStorage.removeItem(TOKEN_KEY)
  history.push('/login')
}
