import React, { useContext, useState } from 'react'
import { Button } from '@mui/material'
import * as PropTypes from 'prop-types'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AccountDeleteAlert from '../../pages/projects/AccountDeleteAlert'
import { canDeleteAccount } from '../../library/Policy'
import { AccountContext } from './AccountList'
import { UserContext } from '../../pages/template'

const ButtonDeleteAccount = (props) => {
  ButtonDeleteAccount.propTypes = {
    reloadGrid: PropTypes.func,
    accountId: PropTypes.number,
  }
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const switchOpenDialog = (state) => {
    setOpenDialogDelete(state)
  }
  const account = useContext(AccountContext)
  const user = useContext(UserContext)
  return (
    <>
      <Button
        disabled={!canDeleteAccount(account, user)}
        variant="contained"
        color="error"
        title="Excluir lançamento"
        size="small"
        onClick={() => switchOpenDialog(true)}
      >
        <DeleteForeverIcon />
      </Button>
      <AccountDeleteAlert
        accountId={props.accountId}
        open={openDialogDelete}
        setOpen={switchOpenDialog}
        reloadDatagrip={props.reloadGrid}
      />
    </>
  )
}

export default ButtonDeleteAccount
