import React, { useContext, useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import AccountEditForm from '../../pages/projects/AccountEditForm'
import PropTypes from 'prop-types'
import CreditCards from '../../pages/projects/CreditCards'
import BillInsert from '../../pages/projects/BillInsert'
import BillList from '../../pages/projects/BillList'
import ButtonDeleteAccount from './ButtonDeleteAccount'
import ShareButton from './ShareButton'
import { canEditAccount, canInsertBill } from '../../library/Policy'
import { AccountContext } from './AccountList'
import { UserContext } from '../../pages/template'

const AccountActionsButtons = (props) => {
  AccountActionsButtons.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
  }
  const account = useContext(AccountContext)
  const user = useContext(UserContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreditCard, setOpenCreditCard] = useState(false)
  const [openBill, setOpenBill] = useState(false)
  const [openBillList, setOpenBillList] = useState(false)
  const handleOpenEdit = (state) => {
    setOpenEdit(state)
  }
  const handleOpenCreditCard = (state) => {
    setOpenCreditCard(state)
  }
  const handleOpenInsertBill = (state) => {
    setOpenBill(state)
  }
  const handleOpenBillList = (state) => {
    setOpenBillList(state)
  }
  return (
    <div style={{ marginTop: 3, justifyContent: 'center', display: 'flex' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button
          color="warning"
          title="Ver cartões de crédito"
          onClick={() => setOpenCreditCard(true)}
        >
          <CreditCardIcon />
          <CreditCards
            reloadCallback={props.reloadCallback}
            handleOpen={handleOpenCreditCard}
            open={openCreditCard}
            accountId={props.accountId}
          />
        </Button>
        <Button
          disabled={!canInsertBill(account, user)}
          color="success"
          title="Inserir lançamento"
          onClick={() => setOpenBill(true)}
        >
          <AddShoppingCartIcon />
        </Button>
        <BillInsert
          openDialog={openBill}
          callbackOpenDialog={handleOpenInsertBill}
          accountId={props.accountId}
          reloadCallback={props.reloadCallback}
        />
        <Button
          color="secondary"
          title="Lista de lançamentos"
          onClick={() => handleOpenBillList(true)}
        >
          <ListAltIcon />
        </Button>
        <BillList
          reloadCallback={props.reloadCallback}
          accountId={props.accountId}
          openDialog={openBillList}
          callbackOpenDialog={handleOpenBillList}
        />
        <ButtonDeleteAccount accountId={props.accountId} reloadGrid={props.reloadCallback} />

        <Button
          disabled={!canEditAccount(account, user)}
          color="info"
          title="Editar projeto"
          onClick={() => setOpenEdit(true)}
        >
          <ModeEditIcon />
          <AccountEditForm
            reloadCallback={props.reloadCallback}
            handleOpen={handleOpenEdit}
            open={openEdit}
            accountId={props.accountId}
          />
        </Button>
        <ShareButton accountId={props.accountId} />
      </ButtonGroup>
    </div>
  )
}

export default AccountActionsButtons
