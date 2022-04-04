import service from './Service'

export default class AccountService {
  async getAccounts() {
    const response = await service.get('/account')
    return response
  }
  async deleteAccount(idAccount) {
    const response = await service.delete('/account/' + idAccount)
    return response
  }
  async getAccount(idAccount) {
    const response = await service.get('/account/' + idAccount)
    return response
  }
  async updateAccount(idAccount, data) {
    const response = await service.put('/account/' + idAccount, data)
    return response
  }
  async insertAccount(data) {
    const response = await service.post('/account/', data)
    return response
  }
}
