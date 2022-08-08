//const UserContext = React.createContext({})

const isOwnerAccount = (account, user) => {
  return account.user.google_id === user.google_id
}
export const canEditAccount = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canInsertBill = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canDeleteAccount = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canShareAccount = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canInsertCreditCard = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}
export const canUpdateCreditCard = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canDeleteCreditCard = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canDeleteBill = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canPayBill = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}

export const canUpdateBill = (account, user) => {
  //return account.user_id === getUser().id
  return isOwnerAccount(account, user)
}
