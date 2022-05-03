import React, { useState } from 'react'
import * as PropTypes from 'prop-types'
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { pay } from '../../componentes/Project/InvoiceActions'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const BillPayInvoiceAlert = (props) => {
  BillPayInvoiceAlert.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    invoiceId: PropTypes.number,
    reloadDatagrip: PropTypes.func,
  }
  const [backdrop, setBackdrop] = useState(false)
  const handleClose = () => {
    props.setOpen(false)
  }
  const payBill = async () => {
    setBackdrop(true)
    await pay(props.invoiceId)
      .then((response) => {
        toast.success('Fatura paga com sucesso!')
      })
      .catch((error) => {
        toast.error('Ocorreu um erro: '.error.response.data.message)
      })
      .finally(() => {
        setBackdrop(false)
        props.reloadDatagrip()
        handleClose()
      })
  }
  return (
    <Dialog
      open={props.open}
      id={uuidv4()}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmação de pagamento</DialogTitle>
      <DialogContent>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente pagar a fatura <strong>{props.invoiceId}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            payBill()
          }}
        >
          Sim
        </Button>
        <Button onClick={handleClose} autoFocus color="success">
          Não
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillPayInvoiceAlert
