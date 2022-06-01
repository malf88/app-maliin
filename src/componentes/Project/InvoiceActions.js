import { getServiceDownloadWithToken, getServiceWithToken } from '../../library/Service'
import download from 'downloadjs'

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
export const downloadPdfBill = async (invoiceId) => {
  return await getServiceDownloadWithToken()
    .get('/invoice/' + invoiceId + '/pdf', {
      responseType: 'blob',
    })
    .then((response) => {
      const content = response.headers['content-type']
      download(response.data, 'fatura#' + invoiceId + '.pdf', content)
    })
}
