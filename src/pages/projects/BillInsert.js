import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
  FormControlLabel,
  Grid,
  Skeleton,
  Switch,
  TextField,
} from '@mui/material'
import TextInputMask from 'react-masked-text'
import TextFieldMask from '../../componentes/form/TextFieldMask'

const BillInsert = (props) => {
  BillInsert.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    openDialog: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }

  const handleClose = () => {
    props.callbackOpenDialog(false)
  }
  const [formFields, setFormFields] = useState({ amount: 0.0 })
  const [message, setMessage] = useState('')
  const [backdrop, setBackdrop] = useState(false)

  return (
    <Dialog open={props.openDialog} onClose={handleClose} maxWidth="xl" scroll="body">
      <DialogTitle>Inserir conta</DialogTitle>
      {message !== '' ? <Alert severity="error">{message}</Alert> : ''}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {backdrop ? (
        <Skeleton sx={{ mt: 5 }} animation="wave" width={'100%'} height={'100%'} />
      ) : (
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="type"
                fullWidth
                onChange={(event, newValue) => {
                  if (newValue) formFields.type = newValue.value
                  else formFields.type = null
                  setFormFields(formFields)
                }}
                options={[
                  { label: 'Débito', value: -1 },
                  { label: 'Crédito', value: 1 },
                ]}
                renderInput={(params) => <TextField {...params} label="Tipo" />}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={1}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                id="description"
                name="description"
                label="Descrição"
                onChange={(event) => {
                  setFormFields({
                    name: event.target.value,
                    due_day: formFields.due_day,
                    close_day: formFields.close_day,
                  })
                }}
                fullWidth
                value={formFields.name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Valor"
                value={formFields.amount}
                onChange={(event) => {
                  setFormFields({
                    amount: event.target.value,
                  })
                }}
                name="numberformat"
                id="amount"
                InputProps={{
                  inputComponent: TextFieldMask,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formFields.pay === true ? formFields.pay : false}
                    value={true}
                    onChange={(event) => {
                      setFormFields({
                        pay: event.target.checked,
                        // name: formFields.name,
                        // close_day: formFields.close_day,
                      })
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Pagar?"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={1}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="category"
                fullWidth
                onChange={(event, newValue) => {
                  if (newValue) formFields.category = newValue.value
                  else formFields.category = null
                  setFormFields(formFields)
                }}
                options={[]}
                renderInput={(params) => <TextField {...params} label="Categoria" />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                id="creditcard"
                fullWidth
                onChange={(event, newValue) => {
                  if (newValue) formFields.creditcard = newValue.value
                  else formFields.creditcard = null
                  setFormFields(formFields)
                }}
                options={[]}
                renderInput={(params) => <TextField {...params} label="Cartão de crédito" />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="portion"
                value={formFields.portion}
                onChange={(event) => {
                  setFormFields({
                    portion: event.target.value,
                    // name: formFields.name,
                    // close_day: formFields.close_day,
                  })
                }}
                label="Qtd. Parcela"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={1}>
            <Grid item xs={12} md={4}>
              <TextField
                id="date"
                value={formFields.date}
                onChange={(event) => {
                  setFormFields({
                    date: event.target.value,
                    // name: formFields.name,
                    // close_day: formFields.close_day,
                  })
                }}
                type="date"
                label="Data"
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="due_date"
                value={formFields.due_date}
                onChange={(event) => {
                  setFormFields({
                    due_date: event.target.value,
                    // name: formFields.name,
                    // close_day: formFields.close_day,
                  })
                }}
                type="date"
                helperText="Data do primeiro vencimento"
                label="Data de vencimento"
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} marginTop={1}>
            <Grid item xs={12} md={12}>
              <TextField
                helperText=""
                id="barcode"
                value={formFields.barcode}
                onChange={(event) => {
                  setFormFields({
                    barcode: event.target.value,
                    // name: formFields.name,
                    // close_day: formFields.close_day,
                  })
                }}
                label="Observação"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
      )}
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button onClick={handleClose} color="error">
          Fechar
        </Button>
        <Button
          color="success"
          onClick={() => {
            console.log('Teste')
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillInsert
