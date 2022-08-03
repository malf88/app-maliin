import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../componentes/header/Header'
import Container from '@mui/material/Container'
import Footer from '../../componentes/footer/Footer'
import { getUser } from '../../componentes/User/UserActions'
import UpdateEmail from '../login/UpdateEmail'
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
        <Container maxWidth="xl" sx={{ minHeight: '82vh' }}>
          {user !== null && user.email === '' ? <UpdateEmail /> : ''}
          <Outlet />
        </Container>
        <Footer />
      </UserContext.Provider>
    </div>
  )
}

export default DefaultTemplate
