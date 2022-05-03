import React, { useState } from 'react'
import { Button } from '@mui/material'
import * as PropTypes from 'prop-types'
import BillDeleteAlert from '../../pages/projects/BillDeleteAlert'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const ButtonDeleteBill = (props) => {
  ButtonDeleteBill.propTypes = {
    reloadGrid: PropTypes.func,
    row: PropTypes.object,
  }
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const switchOpenDialog = (state) => {
    setOpenDialogDelete(state)
  }
  return (
    <>
      <Button
        variant="contained"
        color="error"
        title="Excluir lançamento"
        size="small"
        disabled={props.row.pay_day !== null}
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
