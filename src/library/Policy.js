import { getUser } from '../componentes/User/UserActions'

export const canEditAccount = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canInsertBill = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canDeleteAccount = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canShareAccount = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canInsertCreditCard = (account) => {
  //return account.user_id === getUser().id
  return false
}
export const canUpdateCreditCard = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canDeleteCreditCard = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canDeleteBill = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canPayBill = (account) => {
  //return account.user_id === getUser().id
  return false
}

export const canUpdateBill = (account) => {
  //return account.user_id === getUser().id
  return false
}
