import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
import { deleteCreditCard as creditCardDelete } from '../../componentes/Project/CreditCardActions'
import { toast } from 'react-toastify'

const CreditCardDelete = (props) => {
  CreditCardDelete.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    creditCardId: PropTypes.number,
    openDialogDelete: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }
  const [backdrop, setBackdrop] = useState(false)
  const deleteCreditCard = async () => {
    setBackdrop(true)
    await creditCardDelete(props.creditCardId)
      .then((response) => {
        toast.success('Cartão de crédito removido com sucesso.')
        props.callbackOpenDialog(false)
      })
      .catch((error) => {
        toast.error('Houve um erro ao tentar remover cartão de crédito.')
        props.callbackOpenDialog(false)
      })
    setBackdrop(false)
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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente excluir o registro?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            deleteCreditCard()
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
