import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { deleteAccount, editAccount } from '../../../actions/AccountAction'
import { getDataAccount } from './AccountTable'
import { AccountEdit } from './AccountEdit'
import { AccountDelete } from './AccountDelete'
import { BillInsert } from '../bills/BillInsert'
import { insertBill } from '../../../actions/BillAction'
import { Bills } from '../bills/Bills'
import { ShimmerTable } from 'react-shimmer-effects'
import CreditCards from '../creditcards/CreditCards'
import { AccountInsert } from './AccountInsert'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Accounts = () => {
  const [accountList, setAccountList] = useState([])
  const [accountId, setAccountId] = useState(null)
  const [visibleModalDelete, setVisibleModalDelete] = useState(false)
  const [visibleModalInsert, setVisibleModalInsert] = useState(false)
  const [visibleModalCreditCard, setVisibleModalCreditCard] = useState(false)
  const [visibleModalInsertBill, setVisibleModalInsertBill] = useState(false)
  const [visibleModalEdit, setVisibleModalEdit] = useState(false)
  const [visibleModalBill, setVisibleModalBill] = useState(false)
  const setModalVisibleDelete = (value) => {
    setVisibleModalDelete(value)
  }
  const setModalVisibleEdit = (value) => {
    setVisibleModalEdit(value)
  }
  const setModalVisibleBill = (value) => {
    setVisibleModalBill(value)
  }
  const setModalVisibleEditBill = (value) => {
    setVisibleModalInsertBill(value)
  }

  useEffect(() => {
    const actionsDataAccount = {
      setAccountIdCallback: setAccountId,
      delete: {
        setVisibleModalCallback: setModalVisibleDelete,
        visibleState: visibleModalDelete,
      },
      edit: {
        setVisibleModalCallback: setModalVisibleEdit,
        visibleState: visibleModalEdit,
      },
      addCashFlow: {
        setVisibleModalCallback: setModalVisibleEditBill,
        visibleState: visibleModalInsertBill,
      },
      bills: {
        setVisibleModalCallback: setModalVisibleBill,
        visibleState: visibleModalBill,
      },
      creditCard: {
        setVisibleModalCallback: setVisibleModalCreditCard,
        visibleState: visibleModalCreditCard,
      },
    }
    async function fetchData() {
      if (
        !visibleModalEdit &&
        !visibleModalDelete &&
        !visibleModalInsertBill &&
        !visibleModalInsert
      )
        setAccountList(await getDataAccount(actionsDataAccount))
    }
    fetchData()
  }, [
    visibleModalEdit,
    visibleModalDelete,
    visibleModalInsertBill,
    visibleModalInsert,
    visibleModalBill,
    visibleModalCreditCard,
  ])

  return (
    <CRow>
      <AccountInsert
        modalVisibleState={visibleModalInsert}
        modalVisibleCallback={setVisibleModalInsert}
      />
      <CreditCards
        accountId={accountId}
        modalVisibleState={visibleModalCreditCard}
        modalVisibleCallback={setVisibleModalCreditCard}
        accountIdCallback={setAccountId}
      />
      <Bills
        accountId={accountId}
        accountIdCallback={setAccountId}
        modalVisibleCallback={setModalVisibleBill}
        modalVisibleState={visibleModalBill}
        modalVisibleInsertCallback={setModalVisibleEditBill}
        modalVisibleInsertState={visibleModalInsertBill}
      />
      <BillInsert
        accountId={accountId}
        accountIdCallback={setAccountId}
        insertCallback={insertBill}
        modalVisibleCallback={setModalVisibleEditBill}
        modalVisibleState={visibleModalInsertBill}
      />
      <AccountDelete
        accountId={accountId}
        accountIdCallback={setAccountId}
        deleteCallback={deleteAccount}
        modalVisibleCallback={setModalVisibleDelete}
        modalVisibleState={visibleModalDelete}
      />
      <AccountEdit
        accountId={accountId}
        accountIdCallback={setAccountId}
        editCallback={editAccount}
        modalVisibleCallback={setModalVisibleEdit}
        modalVisibleState={visibleModalEdit}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Account</strong>
          </CCardHeader>
          <CCardBody>
            <CButton
              color="success"
              className="rounded-circle"
              onClick={() => {
                setVisibleModalInsert(true)
              }}
            >
              <CIcon icon={icon.cilPlus} />
            </CButton>
            {accountList.length === 0 ? (
              <ShimmerTable row={2} col={5} />
            ) : (
              <CTable striped responsive="sm">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Bank</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Agency</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Balance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Estimated</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>{accountList}</CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accounts
