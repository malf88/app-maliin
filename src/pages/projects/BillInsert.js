import React, { useEffect, useState } from 'react'
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
  Switch,
  TextField,
} from '@mui/material'
import TextFieldMask from '../../componentes/form/TextFieldMask'
import { listCreditCards } from '../../componentes/Project/CreditCardActions'
import { listCategories } from '../../componentes/Category/CategoryActions'
import moment from 'moment'

const BillInsert = (props) => {
  BillInsert.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    openDialog: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }
  const [creditcards, setCreditcards] = useState([])
  const [categories, setCategories] = useState([])
  const [formFields, setFormFields] = useState({
    amount: 0.0,
    credit_card_id: null,
    category_id: null,
    name: '',
    barcode: '',
    due_date: '',
    date: moment().format('YYYY-MM-DD'),
    portion: 1,
    type: null,
  })
  const [message, setMessage] = useState('')
  const [backdrop, setBackdrop] = useState(false)
  useEffect(() => {
    async function loadCreditCards() {
      let creditcardsPromise = await listCreditCards(props.accountId)
      let arrayOptionCreditCard = []
      creditcardsPromise.forEach((item) => {
        arrayOptionCreditCard.push({ label: item.name, value: item.id })
      })
      setCreditcards(arrayOptionCreditCard)
    }
    async function loadCategories() {
      setBackdrop(true)
      let categoriesPromise = await listCategories()
      let arrayOptionCategories = []
      categoriesPromise.forEach((item) => {
        arrayOptionCategories.push({ label: item.name, value: item.id })
      })
      setCategories(arrayOptionCategories)
      setBackdrop(false)
    }

    if (props.openDialog === true) {
      setBackdrop(true)
      loadCreditCards()
      loadCategories()
      setBackdrop(false)
    }
  }, [props.openDialog])
  const handleClose = () => {
    props.callbackOpenDialog(false)
  }

  return (
    <Dialog
      open={props.openDialog}
      onClose={handleClose}
      maxWidth="xl"
      scroll="body"
      onBackdropClick={() => false}
    >
      <DialogTitle>Inserir conta</DialogTitle>
      {message !== '' ? <Alert severity="error">{message}</Alert> : ''}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="type"
              autoFocus
              fullWidth
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(event, newValue) => {
                if (newValue) formFields.type = newValue.value
                else formFields.type = null
                setFormFields({ ...formFields })
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
              id="description"
              name="description"
              label="Descrição"
              onChange={(event) => {
                formFields.name = event.target.value
                setFormFields({
                  ...formFields,
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
                formFields.amount = event.target.value
                setFormFields({
                  ...formFields,
                })
              }}
              name="numberformat"
              id="amount"
              InputProps={{
                inputComponent: TextFieldMask,
              }}
              InputLabelProps={{ shrink: true }}
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
                    formFields.pay = event.target.checked
                    setFormFields({
                      ...formFields,
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
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(event, newValue) => {
                if (newValue) formFields.category_id = newValue.value
                else formFields.category_id = null
                setFormFields({ ...formFields })
              }}
              options={categories}
              renderInput={(params) => <TextField {...params} label="Categoria" />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="creditcard"
              fullWidth
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(event, newValue) => {
                if (newValue) {
                  formFields.credit_card_id = newValue.value
                  formFields.due_date = ''
                } else {
                  formFields.credit_card_id = null
                }
                setFormFields({ ...formFields })
              }}
              options={creditcards}
              renderInput={(params) => <TextField {...params} label="Cartão de crédito" />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="portion"
              InputLabelProps={{ shrink: true }}
              value={formFields.portion}
              onChange={(event) => {
                formFields.portion = event.target.value
                setFormFields({
                  ...formFields,
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
                formFields.date = event.target.value
                setFormFields({
                  ...formFields,
                })
              }}
              type="date"
              label="Data"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              id="due_date"
              disabled={formFields.credit_card_id !== null}
              value={formFields.due_date}
              onChange={(event) => {
                formFields.due_date = event.target.value
                setFormFields({
                  ...formFields,
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
                formFields.barcode = event.target.value
                setFormFields({
                  ...formFields,
                })
              }}
              label="Observação"
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button onClick={handleClose} color="error">
          Fechar
        </Button>
        <Button
          color="success"
          onClick={() => {
            console.log(formFields)
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillInsert
