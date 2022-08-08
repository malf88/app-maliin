import React, { useContext, useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import AccountEditForm from '../../pages/projects/AccountEditForm'
import PropTypes from 'prop-types'
import CreditCards from '../../pages/projects/CreditCards'
import BillInsert from '../../pages/projects/BillInsert'
import BillList from '../../pages/projects/BillList'
import ButtonDeleteAccount from './ButtonDeleteAccount'
import ShareButton from './ShareButton'
import { canEditAccount } from '../../library/Policy'
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
  const handleOpenEdit = (state) => {
    setOpenEdit(state)
  }
  const handleOpenCreditCard = (state) => {
    setOpenCreditCard(state)
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

        <BillInsert reloadCallback={props.reloadCallback} />

        <BillList reloadCallback={props.reloadCallback} />
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
