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

export const insertAccount = (account) => {
  console.log(account)
  return true
}
