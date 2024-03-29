import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../componentes/footer/Footer'
import { getUser } from '../../componentes/User/UserActions'
import UpdateEmail from '../login/UpdateEmail'
import Nav from '../../componentes/Nav'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const UserContext = React.createContext()

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
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

  return (
    <Grid>
      <ToastContainer />
      <UserContext.Provider value={user}>
        <Grid container>
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
