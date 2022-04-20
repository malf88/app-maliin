import { getServiceWithToken } from '../../library/Service'
import { logout } from '../User/UserActions'

export const listAccounts = async () => {
  let accounts
  await getServiceWithToken()
    .get('/account')
    .then((response) => {
      accounts = response.data
    })
    .catch((error) => {
      logout()
    })
  return accounts
}

export const insertAccount = async (account) => {
  let message = ''
  await getServiceWithToken().post('/account', account)
  return message
}

export const updateAccount = async (id, account) => {
  let message = ''
  await getServiceWithToken().put('/account/' + id, account)
  return message
}

export const getAccount = async (id) => {
  let account = {}
  await getServiceWithToken()
    .get('/account/' + id)
    .then((response) => {
      account = response.data
    })
  return account
}
