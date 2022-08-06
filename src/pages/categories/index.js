import React, { useEffect, useState } from 'react'
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  DialogActions,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'

import Container from '@mui/material/Container'
import {
  getCategory,
  insertCategory,
  updateCategory as update,
} from '../../componentes/Category/CategoryActions'
import CategoryList from './CategoryList'

const Categories = () => {
  const [message, setMessage] = useState('')
  const [btnSalvarlabel, setBtnSalvarLabel] = useState('Salvar')
  const [backdrop, setBackdrop] = useState(false)
  const [categoryId, setCategoryId] = useState(null)
  const [formFields, setFormFields] = useState({
    name: '',
    is_investiment: 'false',
  })
  useEffect(() => {
    async function loadCategory() {
      if (categoryId != null) {
        setMessage('')
        setBackdrop(true)
        let category = await getCategory(categoryId)
        setFormFields(category)
        setBackdrop(false)
        setBtnSalvarLabel('Salvar')
      } else {
        setMessage('')
        setBackdrop(true)
        setFormFields({
          name: '',
          is_investiment: false,
        })
        setBackdrop(false)
        setBtnSalvarLabel('Inserir')
      }
    }

    loadCategory()
  }, [categoryId])

  const addCategory = async () => {
    setBackdrop(true)
    setMessage('')
    await insertCategory(formFields)
      .then((response) => {
        toast.success('Cartão de crédito inserido com sucesso!')
        setCategoryId(null)
        clearFields()
      })
      .catch((error) => {
        setMessage(error.response.data.message)
      })

    setBackdrop(false)
  }
  const updateCategory = async () => {
    setBackdrop(true)
    setMessage('')
    await update(categoryId, formFields)
      .then((response) => {
        toast.success('Cartão de crédito alterado com sucesso!')
        setCategoryId(null)
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
      is_investiment: false,
    })
  }

  return (
    <Container sx={{ marginLeft: 1 }}>
      <h1>Categorias</h1>
      {message !== '' ? <Alert severity="error">{message}</Alert> : ''}

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Nome"
            onChange={(event) => {
              setFormFields({
                ...formFields,
                name: event.target.value,
              })
            }}
            fullWidth
            value={formFields.name}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControlLabel
            labelPlacement="top"
            control={
              <Switch
                id="is_investiment"
                value={formFields.is_investiment}
                checked={formFields.is_investiment}
                onChange={(event) => {
                  setFormFields({
                    ...formFields,
                    is_investiment: event.target.checked,
                  })
                }}
                label="Investimento?"
                fullWidth
              />
            }
            label="Investimento?"
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button
          variant="contained"
          disabled={categoryId === null}
          onClick={() => setCategoryId(null)}
          color="primary"
        >
          Limpar
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            categoryId != null ? updateCategory() : addCategory()
          }}
        >
          {btnSalvarlabel}
        </Button>
      </DialogActions>
      <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} />
    </Container>
  )
}

export default Categories
