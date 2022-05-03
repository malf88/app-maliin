import React, { useState } from 'react'
import { Button } from '@mui/material'
import * as PropTypes from 'prop-types'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import InvoiceList from '../../pages/projects/InvoiceList'

const ButtonInvoice = (props) => {
  ButtonInvoice.propTypes = {
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
        color="info"
        title="Ver fatura do cartão de crédito"
        size="small"
        variant="contained"
        onClick={() => switchOpenDialog(true)}
      >
        <CreditCardIcon />
      </Button>
      <InvoiceList
        invoiceId={props.row.id}
        accountId={props.accountId}
        setOpen={switchOpenDialog}
        open={open}
        reloadCallback={props.reloadGrid}
      />
    </>
  )
}

export default ButtonInvoice
