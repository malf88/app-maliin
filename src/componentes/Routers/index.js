import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultTemplate from '../../pages/template'
import Pages from '../../const/Pages'

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
        <Route path="/" element={<DefaultTemplate />}>
          {routes()}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
