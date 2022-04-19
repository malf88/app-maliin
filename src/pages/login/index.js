import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import {
  Alert,
  Button,
  CircularProgress,
  Fade,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import { authUser, isAuthenticated } from '../../componentes/User/UserActions'
import { useNavigate } from 'react-router-dom'

const version = require('../../../package.json').version

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  //backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}))

const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated()) navigate('/')
  })

  const [loading, setLoading] = useState(false)
  const [fieldForm, setFieldForm] = useState({
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const login = async () => {
    setMessage('')
    setLoading(true)
    let auth = await authUser(fieldForm, navigate)
    setLoading(false)
    setMessage(auth)
  }

  return (
    <Container
      sx={{
        justifyContent: 'center',
        display: 'flex',
        height: window.innerHeight,
        p: 15,
        pt: 10,
        background: '#CCC',
      }}
      maxWidth=""
    >
      <Box
        sx={{
          borderRadius: 5,
          border: 1,
          borderColor: '#CCC',
          background: '#FFF',
          width: '25em',
          height: '30em',
          boxShadow: 3,
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{ justifyContent: 'center', display: 'flex', pl: 2, pr: 2 }}
        >
          <Grid item xs={12} sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
            <img src="/logo.png" alt="Maliin" />
          </Grid>
          <Fade in={loading} unmountOnExit>
            <CircularProgress sx={{ mt: 2 }} />
          </Fade>
          {message !== '' ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {message}
            </Alert>
          ) : (
            <Div sx={{ mt: 2 }}></Div>
          )}

          <Grid item xs={12} sx={{ m: 'auto', mt: 4, justifyContent: 'center', display: 'flex' }}>
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              size="medium"
              onChange={(event) => {
                fieldForm.email = event.target.value
                setFieldForm(fieldForm)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 'auto', mt: 2, justifyContent: 'center', display: 'flex' }}>
            <TextField
              id="password"
              type="password"
              label="Senha"
              size="medium"
              variant="outlined"
              onChange={(event) => {
                fieldForm.password = event.target.value
                setFieldForm(fieldForm)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 'auto', mt: 5, justifyContent: 'center', display: 'flex' }}>
            <Button variant="contained" color="warning" onClick={() => login()}>
              Acessar
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ m: 'auto', mt: 3, alignContent: 'center', display: 'flex' }}>
            <Div sx={{ m: 'auto', alignContent: 'center', display: 'flex' }}>
              {version + '  - 2022'}
            </Div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
