import React, { useContext, useEffect, useState } from 'react'
import {
  Alert,
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
import { toast } from 'react-toastify'
import {
  getCreditCard,
  insertCreditCard,
  updateCreditCard as update,
} from '../../componentes/Project/CreditCardActions'
import CreditCardList from './CreditCardList'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { canInsertCreditCard, canUpdateCreditCard } from '../../library/Policy'
import { AccountContext } from '../../componentes/Project/AccountList'

const CreditCards = (props) => {
  CreditCards.propTypes = {
    handleOpen: PropTypes.func,
    open: PropTypes.any,
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
  }
  const account = useContext(AccountContext)
  const [message, setMessage] = useState('')
  const [btnSalvarlabel, setBtnSalvarLabel] = useState('Salvar')
  const [backdrop, setBackdrop] = useState(false)
  const [creditCardId, setCreditCardId] = useState(null)
  const [formFields, setFormFields] = useState({
    name: '',
    due_day: '',
    close_day: '',
  })
  useEffect(() => {
    async function loadCreditCard() {
      if (creditCardId != null) {
        setMessage('')
        setBackdrop(true)
        let creditcard = await getCreditCard(creditCardId)
        setFormFields(creditcard)
        setBackdrop(false)
        setBtnSalvarLabel('Salvar')
      } else {
        setMessage('')
        setBackdrop(true)
        setFormFields({
          name: '',
          due_day: '',
          close_day: '',
        })
        setBackdrop(false)
        setBtnSalvarLabel('Inserir')
      }
    }

    loadCreditCard()
  }, [creditCardId])

  const addCreditCard = async () => {
    setBackdrop(true)
    setMessage('')
    await insertCreditCard(props.accountId, formFields)
      .then((response) => {
        toast.success('Cartão de crédito inserido com sucesso!')
        setCreditCardId(null)
        clearFields()
      })
      .catch((error) => {
        setMessage(error.response.data.message)
      })

    setBackdrop(false)
  }
  const updateCreditCard = async () => {
    setBackdrop(true)
    setMessage('')
    await update(creditCardId, formFields)
      .then((response) => {
        toast.success('Cartão de crédito alterado com sucesso!')
        setCreditCardId(null)
        clearFields()
      })
      .catch((error) => {
        setMessage(error.response.data.message)
      })

    setBackdrop(false)
  }
  const clearFields = () => {
    setFormFields({
      name: '',
      due_day: '',
      close_day: '',
    })
  }
  const handleClose = () => {
    clearFields()
    props.reloadCallback()
    //props.handleOpen(false)
  }

  return (
    <Dialog open={props.open} onClose={(reason) => {}} fullScreen scroll="body">
      <DialogTitle>
        Cartões de crédito
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
      {backdrop ? (
        <Skeleton sx={{ mt: 5 }} animation="wave" width={'100%'} height={'100%'} />
      ) : (
        <DialogContent>
          <Grid
            container
            spacing={3}
            visibility={
              !canInsertCreditCard(account) && !canUpdateCreditCard(account) ? 'hidden' : 'visible'
            }
          >
            <Grid item xs={12} md={8}>
              <TextField
                autoFocus
                id="name"
                name="name"
                label="Nome"
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

            <Grid item xs={12} md={2}>
              <TextField
                id="due_day"
                value={formFields.due_day}
                onChange={(event) => {
                  setFormFields({
                    due_day: event.target.value,
                    name: formFields.name,
                    close_day: formFields.close_day,
                  })
                }}
                label="Dia de vencimento"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="close_day"
                value={formFields.close_day}
                onChange={(event) => {
                  // formFields.close_day = event.target.value
                  // setFormFields(formFields)
                  setFormFields({
                    close_day: event.target.value,
                    due_day: formFields.due_day,
                    name: formFields.name,
                  })
                }}
                label="Dia de fechamento da fatura"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <CreditCardList
            reloadCallback={props.reloadCallback}
            accountId={props.accountId}
            setCreditCardId={setCreditCardId}
            creditCardId={creditCardId}
          />
        </DialogContent>
      )}
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button onClick={handleClose} color="error">
          Fechar
        </Button>
        <Button onClick={() => setCreditCardId(null)} color="primary">
          Limpar
        </Button>
        <Button
          disabled={!canInsertCreditCard(account) && !canUpdateCreditCard(account)}
          color="success"
          onClick={() => {
            creditCardId != null ? updateCreditCard() : addCreditCard()
          }}
        >
          {btnSalvarlabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreditCards
