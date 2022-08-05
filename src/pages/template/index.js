import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../componentes/header/Header'
import Container from '@mui/material/Container'
import Footer from '../../componentes/footer/Footer'
import { getUser } from '../../componentes/User/UserActions'
import UpdateEmail from '../login/UpdateEmail'
import Nav from '../../componentes/Nav'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
export const UserContext = React.createContext()

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
    <div>
      <UserContext.Provider value={user}>
        <Header />
        <Grid container>
          <Grid item sm={2} sx={{ display: { md: 'block', xs: 'none' } }}>
            <Nav />
          </Grid>
          <Grid item xs={12} md={10}>
            <Container sx={{ minHeight: '82vh', paddingLeft: { xs: 0 } }}>
              {user !== null && user.email === '' ? <UpdateEmail /> : ''}
              <Outlet />
            </Container>
          </Grid>
        </Grid>

        <Footer />
      </UserContext.Provider>
    </div>
  )
}

export default DefaultTemplate
