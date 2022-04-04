import AccountService from '../../../services/AccountService'
import { CButton, CButtonGroup, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import React from 'react'
import Style from '../Style'
import NumberFormat from 'react-number-format'

export async function getDataAccount(accountCallbacks) {
  const accountService = new AccountService()
  let accountListPopulate = await accountService.getAccounts()
  let accountListUpdated = []
  if (Array.isArray(accountListPopulate.data)) {
    accountListPopulate.data.forEach(function (account, index) {
      accountListUpdated.push(mountRow(account, accountCallbacks))
    })
  }
  return accountListUpdated
}

const mountRow = (account, accountObject) => {
  return (
    <CTableRow
      key={account.id}
      style={parseFloat(account.total_balance) >= 0 ? Style.positive : Style.negative}
    >
      <CTableDataCell>
        <CButtonGroup>
          <CButton
            onClick={() => {
              accountObject.setAccountIdCallback(account.id)
              accountObject.delete.setVisibleModalCallback(true)
            }}
            value="Remove"
            color="danger"
            size="sm"
            title="Remove"
          >
            <CIcon icon={icon.cilTrash} />
          </CButton>
          <CButton
            onClick={() => {
              accountObject.setAccountIdCallback(account.id)
              accountObject.edit.setVisibleModalCallback(true)
            }}
            value="Edit"
            color="warning"
            size="sm"
            title="Edit"
          >
            <CIcon icon={icon.cilPen} />
          </CButton>
          <CButton
            onClick={() => {
              accountObject.setAccountIdCallback(account.id)
              accountObject.addCashFlow.setVisibleModalCallback(true)
            }}
            value="Add cash flow"
            color="success"
            size="sm"
            title="add cash flow"
          >
            <CIcon icon={icon.cilMoney} />
          </CButton>
          <CButton
            onClick={() => {
              accountObject.setAccountIdCallback(account.id)
              accountObject.bills.setVisibleModalCallback(true)
            }}
            value="List Bills"
            color="secondary"
            size="sm"
            title="List Bills"
          >
            <CIcon icon={icon.cilListRich} />
          </CButton>
          <CButton
            value="Credit cards"
            color="info"
            size="sm"
            title="Credit cards"
            onClick={() => {
              accountObject.setAccountIdCallback(account.id)
              accountObject.creditCard.setVisibleModalCallback(true)
            }}
          >
            <CIcon icon={icon.cilCreditCard} />
          </CButton>
        </CButtonGroup>
      </CTableDataCell>
      <CTableHeaderCell scope="row">{account.id}</CTableHeaderCell>
      <CTableDataCell>{account.name}</CTableDataCell>
      <CTableDataCell>{account.bank}</CTableDataCell>
      <CTableDataCell>{account.agency}</CTableDataCell>
      <CTableDataCell>
        <NumberFormat
          value={account.total_balance.toString().replace('.', ',')}
          displayType="text"
          thousandSeparator={'.'}
          decimalSeparator={','}
          prefix={'R$ '}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </CTableDataCell>
      <CTableDataCell>
        <NumberFormat
          value={account.total_estimated.toString().replace('.', ',')}
          displayType="text"
          thousandSeparator={'.'}
          decimalSeparator={','}
          prefix={'R$ '}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </CTableDataCell>
    </CTableRow>
  )
}
