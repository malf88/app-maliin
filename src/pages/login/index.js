import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Button, Grid, InputAdornment, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import { authUser } from '../../componentes/User/UserActions'

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  //backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}))

const Login = () => {
  const [fieldForm, setFieldForm] = useState({
    email: '',
    password: '',
  })
  return (
    <Container
      sx={{
        justifyContent: 'center',
        display: 'flex',
        height: window.innerHeight,
        p: 15,
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
          height: '25em',
          boxShadow: 3,
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{ justifyContent: 'center', display: 'flex', pl: 2, pr: 2 }}
        >
          <Grid item xs={12} sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
            <img src="/logo.png" />
          </Grid>

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
            <Button variant="contained" color="warning" onClick={() => authUser(fieldForm)}>
              Acessar
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ m: 'auto', mt: 3, alignContent: 'center', display: 'flex' }}>
            <Div sx={{ m: 'auto', alignContent: 'center', display: 'flex' }}>
              {'v.5.0.1-Beta 2022'}
            </Div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
