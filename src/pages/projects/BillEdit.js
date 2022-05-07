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
import { getBill, updateBill } from '../../componentes/Project/BillActions'
import moment from 'moment'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import BillPortionDatagripColumns from '../../componentes/Project/BillPortionDatagripColumns'
import UpdateChildsBill from '../../componentes/Project/UpdateChildsBill'

const BillEdit = (props) => {
  BillEdit.propTypes = {
    reloadCallback: PropTypes.func,
    billId: PropTypes.number,
    accountId: PropTypes.number,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
  }
  const [creditcards, setCreditcards] = useState([])
  const [updateChilds, setUpdateChilds] = useState(null)
  const [questionUpdateChilds, setQuestionUpdateChilds] = useState(false)
  const [categories, setCategories] = useState([])
  const [formFields, setFormFields] = useState({
    amount: 0.0,
    credit_card_id: null,
    category_id: null,
    description: '',
    barcode: '',
    due_date: '',
    date: '',
    portion: 1,
    type: null,
    pay: 'false',
  })
  const [message, setMessage] = useState('')
  const [backdrop, setBackdrop] = useState(false)
  const [bill, setBill] = useState(false)
  useEffect(() => {
    async function loadCreditCards() {
      let creditcardsPromise = await listCreditCards(props.accountId)
      let arrayOptionCreditCard = []
      creditcardsPromise.forEach((item) => {
        arrayOptionCreditCard.push({ label: item.name, value: item.id })
      })
      setCreditcards(arrayOptionCreditCard)
    }

    const loadCategories = async () => {
      let categoriesPromise = await listCategories()
      let arrayOptionCategories = []
      categoriesPromise.forEach((item) => {
        arrayOptionCategories.push({ label: item.name, value: item.id })
      })
      setCategories(arrayOptionCategories)
    }

    const loadBill = async () => {
      let billPromise = await getBill(props.billId)

      let formFieldsInitial = {
        description: billPromise.description,
        amount: billPromise.amount,
        type:
          billPromise.amount >= 0 ? { label: 'Crédito', value: 1 } : { label: 'Débito', value: -1 },
        pay: billPromise.pay_day !== null ? 'true' : 'false',
        category_id:
          billPromise.category !== null
            ? { label: billPromise.category.name, value: billPromise.category.id }
            : null,
        credit_card_id:
          billPromise.credit_card !== null
            ? { label: billPromise.credit_card.name, value: billPromise.credit_card.id }
            : null,
        date: moment(billPromise.date).format('YYYY-MM-DD'),
        due_date:
          billPromise.due_date !== null ? moment(billPromise.due_date).format('YYYY-MM-DD') : '',
      }
      setFormFields({ ...formFieldsInitial })
      setBill(billPromise)
    }
    const loadData = async () => {
      if (props.open === true) {
        setBackdrop(true)
        await loadCreditCards()
        await loadCategories()
        await loadBill()
        setBackdrop(false)
      }
    }
    loadData()
  }, [props.open, props.accountId, props.billId])
  const handleClose = () => {
    setMessage('')
    setUpdateChilds(null)
    //setBill({})
    props.reloadCallback()
    setFormFields({
      amount: 0.0,
      credit_card_id: null,
      category_id: null,
      description: '',
      barcode: '',
      due_date: '',
      date: moment().format('YYYY-MM-DD'),
      portion: 1,
      type: null,
      pay: 'false',
    })
    props.setOpen(false)
  }
  useEffect(() => {
    const insertBill = async () => {
      setBackdrop(true)
      let payload = { ...formFields }
      if (typeof payload.type === 'object') {
        payload.type = payload.type.value
      }
      if (typeof payload.category_id === 'object') {
        payload.category_id = payload.category_id.value
      }
      if (typeof payload.credit_card_id === 'object') {
        payload.credit_card_id = payload.credit_card_id.value
      }
      if (payload.pay === 'true') {
        payload.pay_day = moment().format('YYYY-MM-DD')
      }
      payload.update_childs = updateChilds
      payload.amount *= payload.type
      await updateBill(props.billId, payload)
        .then((response) => {
          toast.success('Lançamento alterado com sucesso')
        })
        .catch((error) => {
          setMessage(error.response.data.message)
        })
        .finally(() => {
          handleClose()
          setBackdrop(false)
          props.reloadCallback()
        })
    }
    if (updateChilds !== null) {
      insertBill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChilds])

  const preInsertBill = () => {
    if (bill !== null && bill.bill_parent.length > 0) {
      setQuestionUpdateChilds(true)
    } else {
      setUpdateChilds(false)
    }
  }

  const handleUpdateChild = (state) => {
    setUpdateChilds(state)
  }
  return (
    <Dialog
      open={props.open}
      //onClose={handleClose}
      maxWidth="xl"
      scroll="body"
      fullWidth
      disableEscapeKeyDown
      onClose={(reason) => {}}
    >
      <UpdateChildsBill
        open={questionUpdateChilds}
        setOpen={setQuestionUpdateChilds}
        setValueAction={handleUpdateChild}
      />
      <DialogTitle>
        Alterar o lançamento <strong>#{props.billId}</strong>
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="type"
              autoFocus
              fullWidth
              value={formFields.type}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value
              }}
              onChange={(event, newValue) => {
                if (newValue) formFields.type = newValue
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
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formFields.description}
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
              value={formFields.category_id}
              isOptionEqualToValue={(option, value) => option.value === value}
              onChange={(event, newValue) => {
                if (newValue) formFields.category_id = newValue
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
              value={formFields.credit_card_id}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(event, newValue) => {
                if (newValue) {
                  formFields.credit_card_id = newValue
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
        <DataGrid
          autoHeight
          disableColumnSelector
          pagination
          sx={{ mt: 5 }}
          density="compact"
          columnBuffer={8}
          rows={bill !== null ? bill.bill_parent : []}
          columns={BillPortionDatagripColumns()}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </DialogContent>
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button onClick={handleClose} color="error">
          Fechar
        </Button>
        <Button
          color="success"
          onClick={() => {
            preInsertBill()
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillEdit
