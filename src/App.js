import './App.css'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/home">Invoices</Link> | <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
