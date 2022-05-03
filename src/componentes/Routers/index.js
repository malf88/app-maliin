import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultTemplate from '../../pages/template'
import Pages from '../../const/Pages'
import ProtectedRoute from './ProtectedRoute'
import Login from '../../pages/login'

const routes = () => {
  let routeList = []
  const pages = Pages()
  pages.forEach((page) => {
    routeList.push(
      <Route path={page.path} element={page.element()} key={'id' + new Date().getTime()} />,
    )
  })
  return routeList
}
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DefaultTemplate />
            </ProtectedRoute>
          }
        >
          {routes()}
          <Route path="*" element={<p>Error 404</p>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
