import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../componentes/header/Header'
import Container from '@mui/material/Container'
import Footer from '../../componentes/footer/Footer'
import { getUser } from '../../componentes/User/UserActions'
import UpdateEmail from '../login/UpdateEmail'
import Nav from '../../componentes/Nav'
import Box from '@mui/material/Box'
import { Grid, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'

export const UserContext = React.createContext()

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))
const DefaultTemplate = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    async function loadUser() {
      let user = await getUser()
      setUser(user)
    }

    loadUser()
  }, [])

  const theme = useTheme()
  return (
    <Grid>
      <UserContext.Provider value={user}>
        <Grid container>
          <ToastContainer />
          <Nav />
          <Box sx={{ flexGrow: 1, minHeight: '96vh' }}>
            <DrawerHeader />
            {user !== null && user.email === '' ? <UpdateEmail /> : ''}
            <Outlet />
          </Box>
        </Grid>

        <Footer />
      </UserContext.Provider>
    </Grid>
  )
}

export default DefaultTemplate
