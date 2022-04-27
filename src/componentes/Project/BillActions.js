import { getServiceWithToken } from '../../library/Service'
import { logout } from '../User/UserActions'

export const listBills = async (accountId) => {
  let bills
  await getServiceWithToken()
    .get('/bill/account/' + accountId)
    .then((response) => {
      bills = response.data
    })
  return bills
}

export const listBillsBetween = async (accountId, startDate, endDate) => {
  let bills
  await getServiceWithToken()
    .get('/bill/account/' + accountId + '/between/' + startDate + '/' + endDate)
    .then((response) => {
      bills = response.data
    })
  return bills
}

export const insertBill = async (accountId, bill) => {
  return await getServiceWithToken().post('/bill/account/' + accountId, bill)
}

export const listPeriods = async (accountId) => {
  return await getServiceWithToken().get('bill/account/' + accountId + '/periods')
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
