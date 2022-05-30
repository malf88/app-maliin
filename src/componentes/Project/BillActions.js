import { getServiceDownloadWithToken, getServiceWithToken } from '../../library/Service'
import download from 'downloadjs'
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
  return await getServiceWithToken().delete('/bill/' + billId)
}

export const downloadPdfBill = async (accountId, startDate, endDate) => {
  return await getServiceDownloadWithToken()
    .get('/bill/account/' + accountId + '/between/' + startDate + '/' + endDate + '/pdf', {
      responseType: 'blob',
    })
    .then((response) => {
      const content = response.headers['content-type']
      download(response.data, accountId + startDate + endDate + '.pdf', content)
    })
}

export const pay = async (billId) => {
  return await getServiceWithToken().put('/bill/' + billId + '/pay')
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
