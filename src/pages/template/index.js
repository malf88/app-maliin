import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../componentes/header/Header'
import Container from '@mui/material/Container'
import Footer from '../../componentes/footer/Footer'

const DefaultTemplate = () => (
  <div>
    <Header />
    <Container maxWidth="xl">
      <Outlet />
    </Container>
    <Footer />
  </div>
)

export default DefaultTemplate
