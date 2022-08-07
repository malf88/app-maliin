import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Divider, Grid, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import ReceitasDespesas from '../../componentes/Charts/ReceitasDespesas'
import { listAccounts } from '../../componentes/Project/AccountActions'
import { v4 } from 'uuid'
import Box from '@mui/material/Box'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Home = () => {
  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    async function getAccounts() {
      setAccounts(await listAccounts())
    }
    getAccounts()
  }, [])
  return (
    <Container sx={{ marginLeft: 1 }}>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        {accounts.map((account) => (
          <Grid item md={4} xs={11} key={v4()}>
            <Item>
              <ReceitasDespesas account={account} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
