import React, { useState } from 'react'
import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'
import { insertAccount } from '../../componentes/Project/AccountActions'
import { toast } from 'react-toastify'
import Bancos from '../../const/Bancos'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

const AccountInsertForm = (props) => {
  AccountInsertForm.propTypes = {
    handleOpen: PropTypes.func,
    open: PropTypes.any,
    reloadCallback: PropTypes.func,
  }
  const [message, setMessage] = useState('')
  const [backdrop, setBackdrop] = useState(false)
  const addAccount = async () => {
    setBackdrop(true)
    setMessage('')
    await insertAccount(formFields)
      .then((response) => {
        props.reloadCallback()
        toast.success('Projeto inserido com sucesso!')
        props.handleOpen(false)
      })
      .catch((error) => {
        setMessage(error.response.data.message)
      })

    setBackdrop(false)
  }
  const [formFields, setFormFields] = useState({
    name: '',
    bank: '',
    agency: '',
    account: '',
  })

  const handleClose = () => {
    setFormFields({
      name: '',
      bank: '',
      agency: '',
      account: '',
    })
    props.reloadCallback()
    props.handleOpen(false)
  }

  return (
    <Dialog open={props.open} onClose={handleClose} fullScreen>
      <DialogTitle>
        Inserir conta
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
      {message !== '' ? <Alert severity="error">{message}</Alert> : ''}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Nome"
              type="text"
              onChange={(event) => {
                formFields.name = event.target.value
                setFormFields(formFields)
              }}
              fullWidth
              defaultValue={formFields.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="bank"
              fullWidth
              onChange={(event, newValue) => {
                if (newValue) formFields.bank = newValue.value
                else formFields.bank = null
                setFormFields(formFields)
              }}
              options={Bancos()}
              renderInput={(params) => <TextField {...params} label="Banco" />}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              id="agency"
              defaultValue={formFields.agency}
              onChange={(event) => {
                formFields.agency = event.target.value
                setFormFields(formFields)
              }}
              label="Agência"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="account"
              defaultValue={formFields.account}
              onChange={(event) => {
                formFields.account = event.target.value
                setFormFields(formFields)
              }}
              label="Conta"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={() => addAccount()}>Inserir</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountInsertForm
