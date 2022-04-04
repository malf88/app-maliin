import service from './Service'

export default class CreditCardService {
  async getCreditCards(accountId) {
    const response = await service.get('/creditcard/account/' + accountId)
    return response
  }
  async getCreditCard(creditCardId) {
    const response = await service.get('/creditcard/' + creditCardId)
    return response
  }

  async insert(accountId, data) {
    const response = await service.post('/creditcard/account/' + accountId, data)
    return response
  }

  async update(creditCardId, data) {
    const response = await service.put('/creditcard/' + creditCardId, data)
    return response
  }

  async delete(creditCardId) {
    const response = await service.delete('/creditcard/' + creditCardId)
    return response
  }
}
