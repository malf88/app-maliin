import React, { useState } from 'react'
import { Button } from '@mui/material'
import * as PropTypes from 'prop-types'
import BillEdit from '../../pages/projects/BillEdit'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

const ButtonEditBill = (props) => {
  ButtonEditBill.propTypes = {
    reloadGrid: PropTypes.func,
    row: PropTypes.object,
    accountId: PropTypes.number,
  }
  const [open, setOpen] = useState(false)
  const switchOpenDialog = (state) => {
    setOpen(state)
  }
  return (
    <>
      <Button
        variant="contained"
        color="warning"
        title="Editar conta"
        disabled={props.row.pay_day !== null}
        size="small"
        onClick={() => switchOpenDialog(true)}
      >
        <ModeEditIcon />
      </Button>
      <BillEdit
        billId={props.row.id}
        accountId={props.accountId}
        setOpen={setOpen}
        open={open}
        reloadCallback={props.reloadGrid}
      />
    </>
  )
}

export default ButtonEditBill
