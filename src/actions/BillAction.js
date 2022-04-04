import BillService from '../services/BillService'
import moment from 'moment'
import { promiseDelete, promiseInfo, promiseUpdate } from '../views/utils/assets/Alerts'
import { formatValue } from 'react-currency-input-field'

export const insertBill = async (accountId, formValue, closeModalCallBak) => {
  let billService = new BillService()
  const formatAmount = formatValue({
    value: formValue.amount.toString().replace(',', '.'),
    groupSeparator: '',
    decimalSeparator: '.',
    prefix: '',
    allowNegativeValue: true,
  })
  formValue.amount = formatAmount * formValue.type.value

  let data = {
    description: formValue.description,
    amount: formValue.amount,
    date: formValue.date,
    credit_card_id: formValue.credit_card_id,
    category_id: formValue.category_id,
    barcode: formValue.barcode,
    portion: formValue.portion,
    due_date: null,
  }
  if (formValue.paidOut) {
    data.pay_day = moment().format('YYYY-MM-DD')
  }
  if (formValue.category_id) data.category_id = formValue.category_id.value
  if (formValue.credit_card_id) data.credit_card_id = formValue.credit_card_id.value
  if (!formValue.credit_card_id) data.due_date = formValue.due_date
  let responseInsertBill = billService.insertBill(accountId, data).then((response) => {
    closeModalCallBak()
  })
  promiseUpdate(responseInsertBill)
}

export const removeBill = (billId, reloadTable) => {
  let billService = new BillService()
  let responseDeleteBill = billService.deleteBill(billId).then((response) => {
    reloadTable()
  })
  promiseDelete(responseDeleteBill)
}

export const paidBill = (billId, reloadTable) => {
  let billService = new BillService()
  let responsePaidBill = billService.paidBill(billId).then((response) => {
    reloadTable()
  })
  promiseInfo('Bill paid successfully', responsePaidBill)
}

export const updateBill = async (billId, formValue, closeModalCallBak) => {
  let billService = new BillService()
  const formatAmount = formatValue({
    value: formValue.amount.toString().replace(',', '.'),
    groupSeparator: '',
    decimalSeparator: '.',
    prefix: '',
    allowNegativeValue: true,
  })
  formValue.amount = formatAmount * formValue.type.value

  let data = {
    description: formValue.description,
    amount: formValue.amount,
    date: formValue.date,
    credit_card_id: formValue.credit_card_id,
    category_id: formValue.category_id,
    barcode: formValue.barcode,
    due_date: null,
    update_childs: formValue.update_childs,
  }
  if (formValue.paidOut) {
    data.pay_day = moment().format('YYYY-MM-DD')
  }
  if (formValue.category_id) data.category_id = formValue.category_id.value
  if (formValue.credit_card_id) data.credit_card_id = formValue.credit_card_id.value
  if (!formValue.credit_card_id) data.due_date = formValue.due_date
  let responseUpdateBill = billService.updateBill(billId, data).then((response) => {
    closeModalCallBak()
  })
  promiseUpdate(responseUpdateBill)
}
