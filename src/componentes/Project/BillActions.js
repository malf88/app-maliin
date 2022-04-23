import { getServiceWithToken } from '../../library/Service'
import { logout } from '../User/UserActions'

export const listBills = async (accountId) => {
  let creditcards
  await getServiceWithToken()
    .get('/bill/account/' + accountId)
    .then((response) => {
      creditcards = response.data
    })
  return creditcards
}

export const insertBill = async (accountId, bill) => {
  let message = ''
  await getServiceWithToken().post('/bill/account/' + accountId, bill)
  return message
}

export const updateBill = async (billId, bill) => {
  let message = ''
  await getServiceWithToken().put('/bill/' + billId, bill)
  return message
}

export const deleteBill = async (billId) => {
  let message = ''
  return await getServiceWithToken().delete('/bill/' + billId)
}

export const getBill = async (BillId) => {
  let account = {}
  await getServiceWithToken()
    .get('/bill/' + BillId)
    .then((response) => {
      account = response.data
    })
  return account
}
