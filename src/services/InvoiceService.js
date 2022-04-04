import service from './Service'

export default class InvoiceService {
  async paidInvoice(billId) {
    const response = await service.patch('/invoice/pay/' + billId)
    return response
  }
  async invoice(invoiceId) {
    const response = await service.get('/invoice/' + invoiceId)
    return response
  }
}
