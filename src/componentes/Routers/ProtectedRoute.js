import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../User/UserActions'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />
  } else return children
}
export default ProtectedRoute
