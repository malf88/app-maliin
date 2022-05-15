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
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import TextFieldMask from '../../componentes/form/TextFieldMask'
import { listCreditCards } from '../../componentes/Project/CreditCardActions'
import { listCategories } from '../../componentes/Category/CategoryActions'
import { insertBill as billInsert } from '../../componentes/Project/BillActions'
import moment from 'moment'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

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
    description: '',
    barcode: '',
    due_date: '',
    date: moment().utc(false).format('YYYY-MM-DD'),
    portion: 1,
    type: null,
    pay: 'false',
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
  }, [props.openDialog, props.accountId])
  const handleClose = () => {
    setMessage('')
    setFormFields({
      amount: 0.0,
      credit_card_id: null,
      category_id: null,
      description: '',
      barcode: '',
      due_date: '',
      date: moment().utc(false).format('YYYY-MM-DD'),
      portion: 1,
      type: null,
      pay: 'false',
    })
    props.callbackOpenDialog(false)
  }
  const insertBill = async () => {
    setBackdrop(true)
    let payload = { ...formFields }
    payload.amount *= payload.type
    if (payload.pay === 'true') {
      payload.pay_day = moment().utc(false).format('YYYY-MM-DD')
    }
    await billInsert(props.accountId, payload)
      .then((response) => {
        toast.success('Lançamento inserido com sucesso')
        handleClose()
        props.reloadCallback()
      })
      .catch((error) => {
        setMessage(error.response.data.message)
      })

    setBackdrop(false)
  }
  return (
    <Dialog
      open={props.openDialog}
      //onClose={handleClose}
      maxWidth="xl"
      scroll="body"
      fullWidth
      disableEscapeKeyDown
      onClose={(reason) => {}}
    >
      <DialogTitle>
        Inserir lançamento
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

      <DialogContent>
        {message !== '' ? <Alert severity="error">{message}</Alert> : ''}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={3} pt={3}>
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
          <Grid item xs={12} md={8}>
            <TextField
              id="description"
              name="description"
              label="Descrição"
              onChange={(event) => {
                formFields.description = event.target.value
                setFormFields({
                  ...formFields,
                })
              }}
              fullWidth
              value={formFields.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={2}>
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
            <ToggleButtonGroup
              color="standard"
              size="medium"
              title={'Pagar?'}
              aria-label={'Pagar?'}
              value={formFields.pay}
              exclusive
              onChange={(event) => {
                formFields.pay = event.target.value
                setFormFields({
                  ...formFields,
                })
              }}
            >
              <ToggleButton value="true" color={'success'}>
                Sim
              </ToggleButton>
              <ToggleButton value="false" color={'error'}>
                Não
              </ToggleButton>
            </ToggleButtonGroup>
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
          <Grid item xs={12} md={2}>
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={11}>
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
            insertBill()
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillInsert
