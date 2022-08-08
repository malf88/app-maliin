import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Backdrop, CircularProgress, Divider, Grid, Paper, Skeleton, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import ReceitasDespesas from '../../componentes/Charts/ReceitasDespesas'
import { listAccounts } from '../../componentes/Project/AccountActions'
import { v4 } from 'uuid'
import Box from '@mui/material/Box'
import Currency from '../../componentes/formatter/Currency'
import Typography from '@mui/material/Typography'
import AccountWidget from '../../componentes/Project/AccountWidget'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Home = () => {
  const [accounts, setAccounts] = useState([])
  const [backdrop, setBackdrop] = useState(false)
  useEffect(() => {
    async function getAccounts() {
      setBackdrop(true)
      setAccounts(await listAccounts())
      setBackdrop(false)
    }
    getAccounts()
  }, [])
  const totalAccounts = () => {
    let totalBalance = 0.0
    accounts.forEach((item) => {
      totalBalance += parseFloat(item.total_balance)
    })
    return totalBalance
  }
  return (
    <Container sx={{ marginLeft: 0 }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} key={v4()}>
          <Item
            sx={{
              backgroundColor: '#ffffff',
              height: 196,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: 50, fontWeight: 'bold' }}
              color={totalAccounts() >= 0 ? '#008800' : '#880000'}
              gutterBottom
            >
              {backdrop ? <Skeleton animation="wave" variant="text" /> : Currency(totalAccounts())}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Saldo atual
            </Typography>
          </Item>
        </Grid>
        <Grid item md={4} xs={12} key={v4()}>
          <Item sx={{ backgroundColor: '#ffffff', height: 196 }}>
            <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
              Projetos
            </Typography>
            {backdrop ? (
              <Skeleton animation="wave" height={150} variant="rectangular" />
            ) : (
              <Box sx={{ overflowY: 'auto', height: 156 }}>
                <AccountWidget accounts={accounts} />
              </Box>
            )}
          </Item>
        </Grid>
        {accounts.map((account) => (
          <Grid item md={4} xs={12} key={v4()}>
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
