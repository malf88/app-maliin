import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { Backdrop, CircularProgress, Grid, Paper, Skeleton } from '@mui/material'
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

  const getAccounts = async () => {
    setBackdrop(true)
    setAccounts(await listAccounts())
    setBackdrop(false)
  }
  useEffect(() => {
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
          <Grid item md={12} xs={12} key={v4()}>
            <Item
              sx={{
                backgroundColor: '#ffffff',
                height: 196,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Saldo atual
              </Typography>
              <Typography
                sx={{ fontSize: 50, fontWeight: 'bold' }}
                color={totalAccounts() >= 0 ? '#008800' : '#880000'}
                gutterBottom
              >
                {backdrop ? (
                  <Skeleton animation="wave" variant="text" />
                ) : (
                  Currency(totalAccounts())
                )}
              </Typography>
            </Item>
            <Item
              sx={{ backgroundColor: '#ffffff', borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
            >
              <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
                Projetos
              </Typography>
              {backdrop ? (
                <Skeleton animation="wave" height={150} variant="rectangular" />
              ) : (
                <Box>
                  <AccountWidget accounts={accounts} reloadCallback={getAccounts} />
                </Box>
              )}
            </Item>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12} key={v4()}>
          {accounts.map((account) => (
            <Grid item md={12} xs={4} key={v4()} sx={{ marginBottom: 2 }}>
              <Item>
                <ReceitasDespesas account={account} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
