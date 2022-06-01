import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import InvoiceDatagrip from './InvoiceDatagrip'
import { toast } from 'react-toastify'
import { downloadPdfBill } from '../../componentes/Project/InvoiceActions'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'

const InvoiceList = (props) => {
  InvoiceList.propTypes = {
    reloadCallback: PropTypes.func,
    invoiceId: PropTypes.number,
    accountId: PropTypes.number,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
  }
  const handleClose = () => {
    props.setOpen(false)
    props.reloadCallback()
  }
  return (
    <Dialog open={props.open} onClose={(reason) => {}} fullWidth maxWidth="xl" scroll="body">
      <DialogTitle>
        Fatura #{props.invoiceId}
        <Button
          sx={{ ml: 1 }}
          onClick={() => {
            toast.info('Gerando pdf...')
            downloadPdfBill(props.invoiceId)
          }}
          color="error"
        >
          <LocalPrintshopIcon />
        </Button>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <InvoiceDatagrip
          accountId={props.accountId}
          invoiceId={props.invoiceId}
          reloadCallback={props.reloadCallback}
          reloadTable={props.open}
        />
      </DialogContent>
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button onClick={handleClose} color="error">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InvoiceList
