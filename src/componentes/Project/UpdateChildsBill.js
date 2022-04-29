import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const UpdateChildsBill = (props) => {
  UpdateChildsBill.propTypes = {
    setValueAction: PropTypes.func,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
  }
  const handleClose = () => {
    props.setOpen(false)
    props.setValueAction(false)
  }

  const handleUpdateStatus = () => {
    props.setValueAction(true)
    props.setOpen(false)
  }
  return (
    <Dialog
      open={props.open}
      id={uuidv4()}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Alterar demais parcelas</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deseja aplicar alteraç&otilde;es nas demais parcelas?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            handleUpdateStatus()
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

export default UpdateChildsBill
