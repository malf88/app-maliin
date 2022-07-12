import { getUser } from '../componentes/User/UserActions'

export const canEditAccount = (account) => {
  //return account.user_id === getUser().id
  return true
}

export const canInsertBill = (account) => {
  //return account.user_id === getUser().id
  return true
}

export const canDeleteAccount = (account) => {
  //return account.user_id === getUser().id
  return true
}
