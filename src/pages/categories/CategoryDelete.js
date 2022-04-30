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
import { toast } from 'react-toastify'
import { deleteCategory } from '../../componentes/Category/CategoryActions'

const CategoryDelete = (props) => {
  CategoryDelete.propTypes = {
    reloadCallback: PropTypes.func,
    category: PropTypes.object,
    openDialogDelete: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }
  const [backdrop, setBackdrop] = useState(false)
  const processDeleteCategory = async () => {
    setBackdrop(true)
    await deleteCategory(props.category.id)
      .then((response) => {
        toast.success('Categoria removida com sucesso.')
        props.callbackOpenDialog(false)
      })
      .catch((error) => {
        toast.error('Houve um erro ao tentar remover categoria.')
        props.callbackOpenDialog(false)
      })
      .finally(() => {
        props.reloadCallback()
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
          Deseja realmente excluir a categoria <strong>{props.category.name}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            processDeleteCategory()
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

export default CategoryDelete
