import { getServiceWithToken } from '../../library/Service'

export const insertBill = async (accountId, bill) => {
  return await getServiceWithToken().post('/bill/account/' + accountId, bill)
}
