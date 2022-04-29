import { getServiceWithToken } from '../../library/Service'

export const listBills = async (invoiceId) => {
  let bills
  await getServiceWithToken()
    .get('/invoice/' + invoiceId)
    .then((response) => {
      bills = response.data
    })
  return bills
}

export const pay = async (invoiceId) => {
  return await getServiceWithToken().patch('/invoice/pay/' + invoiceId)
}

export const getBill = async (billId) => {
  let bill = {}
  await getServiceWithToken()
    .get('/bill/' + billId)
    .then((response) => {
      bill = response.data
    })
  return bill
}
