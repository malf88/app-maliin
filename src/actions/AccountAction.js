import AccountService from '../services/AccountService'
import { promiseDelete, promiseUpdate } from '../views/utils/assets/Alerts'

export const deleteAccount = async (idAccount) => {
  let accountService = new AccountService()
  let responseDeleteAccount = accountService.deleteAccount(idAccount)
  promiseDelete(responseDeleteAccount)
}

export const editAccount = async (idAccount, data, closeModalCallback) => {
  data.bank = data.bank.value
  let accountService = new AccountService()
  let responseUpdateAccount = accountService.updateAccount(idAccount, data).then((response) => {
    closeModalCallback()
  })
  promiseUpdate(responseUpdateAccount)
}

export const insertAccount = async (data, closeModalCallback) => {
  data.bank = data.bank.value
  let accountService = new AccountService()
  let responseUpdateAccount = accountService.insertAccount(data).then((response) => {
    closeModalCallback()
  })
  promiseUpdate(responseUpdateAccount)
}
