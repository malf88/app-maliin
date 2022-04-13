import React, { useState } from 'react'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import PropTypes from 'prop-types'
import { insertAccount } from '../../componentes/Projects/AccountActions'

const AccountInsertForm = (props) => {
  AccountInsertForm.propTypes = {
    handleOpen: PropTypes.func,
    open: PropTypes.any,
  }

  const [formFields, setFormFields] = useState({
    name: '',
    bank: '',
    agency: '',
    account: '',
  })

  const handleClose = () => {
    props.handleOpen(false)
  }

  return (
    <Dialog open={props.open} onClose={handleClose} fullScreen>
      <DialogTitle>Inserir conta</DialogTitle>
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
                if (newValue) formFields.bank = newValue.id
                else formFields.bank = null
                setFormFields(formFields)
              }}
              // onInputChange={(event, newInputValue) => {
              //   formFields.bank = event.target.value
              //   setFormFields(formFields)
              // }}
              options={[{ label: 'Teste', id: '1' }]}
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
        <Button onClick={() => insertAccount(formFields)}>Inserir</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountInsertForm
