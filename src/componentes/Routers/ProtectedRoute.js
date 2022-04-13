import React from 'react'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const user = null

  if (!user) {
    console.log(user)
    return <Navigate to="/login" />
  } else return children
}
export default ProtectedRoute
