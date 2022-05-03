import Home from '../pages/home'
import React from 'react'
import Projects from '../pages/projects'
import Categories from '../pages/categories'

const Pages = () => {
  return [
    { label: 'Home', path: '/', element: () => <Home /> },
    { label: 'Projetos', path: '/projetos', element: () => <Projects /> },
    { label: 'Categorias', path: '/categorias', element: () => <Categories /> },
  ]
}

export default Pages
