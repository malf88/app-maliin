import service from './Service'

export default class BillService {
  async insertBill(accountId, data) {
    const response = await service.post('/bill/account/' + accountId, data)
    return response
  }
  async listBill(accountId, rangeDate) {
    const response = await service.get(
      '/bill/account/' + accountId + '/between/' + rangeDate.start + '/' + rangeDate.end,
    )
    return response
  }
  async listBillPeriods(accountId) {
    const response = await service.get('/bill/account/' + accountId + '/periods')
    return response
  }
  async bill(billId) {
    const response = await service.get('/bill/' + billId)
    return response
  }
  async deleteBill(billId) {
    const response = await service.delete('/bill/' + billId)
    return response
  }

  async paidBill(billId) {
    const response = await service.put('/bill/' + billId + '/pay')
    return response
  }
  async updateBill(billId, data) {
    const response = await service.put('/bill/' + billId, data)
    return response
  }
}
