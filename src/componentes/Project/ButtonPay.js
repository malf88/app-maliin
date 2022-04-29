import React, { useState } from 'react'
import { Button } from '@mui/material'
import BillPayAlert from '../../pages/projects/BillPayAlert'
import * as PropTypes from 'prop-types'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { v4 as uuidv4 } from 'uuid'

const ButtonPay = (props) => {
  ButtonPay.propTypes = {
    reloadGrid: PropTypes.func,
    row: PropTypes.object,
  }
  const [openDialogPay, setOpenDialogPay] = useState(false)
  const switchOpenDialog = (state) => {
    setOpenDialogPay(state)
  }
  return (
    <>
      <Button
        key={uuidv4}
        variant="contained"
        color="success"
        title="Pagar conta"
        size="small"
        disabled={props.row.pay_day !== null}
        onClick={(event) => switchOpenDialog(true)}
      >
        <AttachMoneyIcon />
      </Button>
      <BillPayAlert
        billId={props.row.id}
        open={openDialogPay}
        setOpen={switchOpenDialog}
        reloadDatagrip={props.reloadGrid}
      />
    </>
  )
}

export default ButtonPay
