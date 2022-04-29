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
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { deleteBill } from '../../componentes/Project/BillActions'

const BillDeleteAlert = (props) => {
  BillDeleteAlert.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    billId: PropTypes.number,
    reloadDatagrip: PropTypes.func,
  }
  const [backdrop, setBackdrop] = useState(false)
  const handleClose = () => {
    props.setOpen(false)
  }
  const handleDeleteBill = async () => {
    setBackdrop(true)
    await deleteBill(props.billId)
      .then((response) => {
        toast.success('Lançamento excluído com sucesso!')
      })
      .catch((error) => {
        toast.error('Ocorreu um erro: '.error.response.data.message)
      })
      .finally(() => {
        props.reloadDatagrip(props.billId)
        handleClose()
        setBackdrop(false)
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
      <DialogTitle id="alert-dialog-title">Confirmação de exclusão</DialogTitle>
      <DialogContent>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogContentText id="alert-dialog-description">
          Deseja realmente excluir o lançamento <strong>{props.billId}?</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            handleDeleteBill()
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

export default BillDeleteAlert
