import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../componentes/header/Header'

const DefaultTemplate = () => (
  <div>
    <Header />
    <Outlet />
  </div>
)

export default DefaultTemplate
