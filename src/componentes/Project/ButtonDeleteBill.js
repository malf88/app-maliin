import React, { useContext, useState } from 'react'
import { Button } from '@mui/material'
import * as PropTypes from 'prop-types'
import BillDeleteAlert from '../../pages/projects/BillDeleteAlert'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { canDeleteBill } from '../../library/Policy'
import { AccountContext } from './AccountList'

const ButtonDeleteBill = (props) => {
  ButtonDeleteBill.propTypes = {
    reloadGrid: PropTypes.func,
    row: PropTypes.object,
  }
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const switchOpenDialog = (state) => {
    setOpenDialogDelete(state)
  }
  const account = useContext(AccountContext)
  return (
    <>
      <Button
        variant="contained"
        color="error"
        title="Excluir lançamento"
        size="small"
        disabled={props.row.pay_day !== null || !canDeleteBill(account)}
        onClick={() => switchOpenDialog(true)}
      >
        <DeleteForeverIcon />
      </Button>
      <BillDeleteAlert
        billId={props.row.id}
        open={openDialogDelete}
        setOpen={switchOpenDialog}
        reloadDatagrip={props.reloadGrid}
      />
    </>
  )
}

export default ButtonDeleteBill
