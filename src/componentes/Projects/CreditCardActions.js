import { getServiceWithToken } from '../../library/Service'
import { logout } from '../User/UserActions'

export const listCreditCards = async (accountId) => {
  let creditcards
  await getServiceWithToken()
    .get('/creditcard/account/' + accountId)
    .then((response) => {
      creditcards = response.data
    })
  return creditcards
}

export const insertCreditCard = async (accountId, creditCard) => {
  let message = ''
  await getServiceWithToken().post('/creditcard/account/' + accountId, creditCard)
  return message
}

export const updateCreditCard = async (creditcardId, creditCard) => {
  let message = ''
  await getServiceWithToken().put('/creditcard/' + creditcardId, creditCard)
  return message
}

export const getCreditCard = async (creditcardId) => {
  let account = {}
  await getServiceWithToken()
    .get('/creditcard/' + creditcardId)
    .then((response) => {
      account = response.data
    })
  return account
}
