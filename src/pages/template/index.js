import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../componentes/header/Header'
import Container from '@mui/material/Container'

const DefaultTemplate = () => (
  <div>
    <Header />
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  </div>
)

export default DefaultTemplate
