import { promiseInfo } from '../views/utils/assets/Alerts'
import InvoiceService from '../services/InvoiceService'

export const paidInvoice = (invoiceId, reloadTable) => {
  let invoiceService = new InvoiceService()
  let responsePaidInvoice = invoiceService.paidInvoice(invoiceId).then((response) => {
    reloadTable()
  })
  promiseInfo('Invoice paid successfully', responsePaidInvoice)
}
