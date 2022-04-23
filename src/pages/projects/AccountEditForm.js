import React, { useEffect, useState } from 'react'
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
  Skeleton,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'
import { getAccount, updateAccount as update } from '../../componentes/Project/AccountActions'
import { toast } from 'react-toastify'
import Bancos, { buscarBancos } from '../../const/Bancos'

const AccountEditForm = (props) => {
  AccountEditForm.propTypes = {
    handleOpen: PropTypes.func,
    open: PropTypes.any,
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
  }
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [backdrop, setBackdrop] = useState(false)
  const [formFields, setFormFields] = useState({
    name: '',
    bank: '',
    agency: '',
    account: '',
  })
  useEffect(() => {
    const populaAccount = async () => {
      if (props.open) {
        setShowForm(false)
        setBackdrop(true)
        let accountField = await getAccount(props.accountId)
        setFormFields(accountField)
        setBackdrop(false)
        setShowForm(true)
      }
    }
    populaAccount()
  }, [props.open, props.accountId])

  const updateAccount = async () => {
    setBackdrop(true)
    setMessage('')
    await update(props.accountId, formFields)
      .then((response) => {
        toast.success('Projeto alterado com sucesso!')
        props.reloadCallback()
        props.handleOpen(false)
      })
      .catch((error) => {
        setMessage(error.response.data.message)
      })

    setBackdrop(false)
  }

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
        Alterar conta <strong>{formFields.name}</strong>
      </DialogTitle>
      {message !== '' ? <Alert severity="error">{message}</Alert> : ''}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {showForm ? (
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                autoFocus
                disabled={backdrop}
                margin="normal"
                id="nome"
                label="Nome"
                InputLabelProps={{ shrink: true }}
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
                disabled={backdrop}
                onChange={(event, newValue) => {
                  if (newValue) formFields.bank = newValue.value
                  else formFields.bank = null
                  setFormFields(formFields)
                }}
                defaultValue={buscarBancos(formFields.bank)}
                options={Bancos()}
                renderInput={(params) => <TextField {...params} label="Banco" />}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="agency"
                disabled={backdrop}
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
                disabled={backdrop}
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
      ) : (
        <Skeleton variant="rect" width="100%" height="100%" />
      )}
      <DialogActions>
        <Button disabled={backdrop} onClick={() => handleClose()}>
          Cancelar
        </Button>
        <Button disabled={backdrop} onClick={() => updateAccount()}>
          Alterar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountEditForm
