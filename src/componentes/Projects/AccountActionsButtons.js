import React, { useState } from 'react'
import { Button, ButtonGroup } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import AccountEditForm from '../../pages/projects/AccountEditForm'
import PropTypes from 'prop-types'

const AccountActionsButtons = (props) => {
  AccountActionsButtons.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
  }
  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenEdit = (state) => {
    setOpenEdit(state)
  }
  return (
    <div style={{ marginTop: 3, justifyContent: 'center', display: 'flex' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button color="warning" title="Inserir cartão de crédito">
          <CreditCardIcon />
        </Button>
        <Button color="success" title="Inserir lançamento">
          <AddShoppingCartIcon />
        </Button>
        <Button color="secondary" title="Lista de compras">
          <ListAltIcon />
        </Button>
        <Button color="error" title="Excluir conta">
          <DeleteForeverIcon />
        </Button>
        <Button color="info" title="Editar conta" onClick={() => setOpenEdit(true)}>
          <ModeEditIcon />
          <AccountEditForm
            reloadCallback={props.reloadCallback}
            handleOpen={handleOpenEdit}
            open={openEdit}
            accountId={props.accountId}
          />
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default AccountActionsButtons
