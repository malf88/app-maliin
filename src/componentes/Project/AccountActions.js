import { getServiceWithToken } from '../../library/Service'

export const listAccounts = async () => {
  let accounts
  await getServiceWithToken()
    .get('/account')
    .then((response) => {
      accounts = response.data
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

export const deleteAccount = async (id) => {
  return await getServiceWithToken().delete('/account/' + id)
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

export const getListSharedAccount = async (id) => {
  let listUser = []
  await getServiceWithToken()
    .get('/account/' + id + '/user')
    .then((response) => {
      listUser = response.data
    })
  return listUser
}

export const deleteSharedAccount = async (idAccount, idUser) => {
  await getServiceWithToken()
    .delete('/account/' + idAccount + '/user/' + idUser)
    .then((response) => {
      return response.data
    })
}
