import { promiseDelete, promiseInfo, promiseUpdate } from '../views/utils/assets/Alerts'
import CreditCardService from '../services/CreditCardService'

export const insertCreditCard = async (accountId, data, callback) => {
  let creditCardService = new CreditCardService()
  let responseInsertCreditCard = creditCardService.insert(accountId, data).then((response) => {
    callback()
  })
  promiseInfo('Credit card insert successful', responseInsertCreditCard)
}

export const deleteCreditCard = async (idCreditCard, creditcardListCallback) => {
  let creditCardService = new CreditCardService()
  let responseDeleteCreditCard = creditCardService.delete(idCreditCard).then((response) => {
    creditcardListCallback([])
  })
  promiseDelete(responseDeleteCreditCard)
}
export const updateCreditCard = async (idCreditCard, data, callback) => {
  let creditCardService = new CreditCardService()
  let responseUpdateCreditCard = creditCardService.update(idCreditCard, data).then((response) => {
    callback()
  })
  promiseUpdate(responseUpdateCreditCard)
}
