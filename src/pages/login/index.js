import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Alert, CircularProgress, Fade, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { authUser, isAuthenticated } from '../../componentes/User/UserActions'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
const version = require('../../../package.json').version

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  //backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}))
const GoogleButtonStyled = styled('div')(({ theme }) => ({
  //backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}))

const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated()) navigate('/')
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const login = async (response) => {
    setMessage('')
    setLoading(true)
    let auth = await authUser(response.access_token, navigate)
    setLoading(false)
    setMessage(auth)
  }
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    callback: (response) => {
      login(response)
    },
  })

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
          height: '18em',
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
            <Alert severity="error" sx={{ mt: 0 }}>
              {message}
            </Alert>
          ) : (
            <Div sx={{ mt: 0 }}></Div>
          )}
          <Grid
            visibility={loading ? 'hidden' : 'visible'}
            item
            xs={12}
            sx={{ m: 'auto', mt: 0, alignContent: 'center', display: 'flex' }}
          >
            <GoogleButtonStyled sx={{ m: 'auto', alignContent: 'center', display: 'flex' }}>
              <GoogleButton
                onClick={() => client.requestAccessToken()}
                label="Acessar com google"
              />
            </GoogleButtonStyled>
          </Grid>
          <Grid item xs={12} sx={{ m: 'auto', mt: 1, alignContent: 'center', display: 'flex' }}>
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
