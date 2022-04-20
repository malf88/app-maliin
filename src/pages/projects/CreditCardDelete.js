import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const CreditCardDelete = (props) => {
  CreditCardDelete.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    creditCardId: PropTypes.number,
    openDialogDelete: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }
  const handleClose = () => {
    props.callbackOpenDialog(false)
  }
  return (
    <Dialog
      open={props.openDialogDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmação de exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente excluir o registro?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            handleClose()
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

export default CreditCardDelete
