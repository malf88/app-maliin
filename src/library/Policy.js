import { USER_KEY } from '../componentes/User/UserActions'

//const UserContext = React.createContext({})

const isOwnerAccount = (account) => {
  const user = sessionStorage.getItem(USER_KEY)
  console.log(account)
  return false
}
export const canEditAccount = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canInsertBill = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canDeleteAccount = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canShareAccount = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canInsertCreditCard = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}
export const canUpdateCreditCard = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canDeleteCreditCard = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canDeleteBill = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canPayBill = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}

export const canUpdateBill = (account) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account)
}
