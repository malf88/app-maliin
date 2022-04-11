import Home from '../pages/home'
import React from 'react'
import Projects from '../pages/projects'

const Pages = () => {
  return [
    { label: 'Home', path: '/', element: () => <Home /> },
    { label: 'Projetos', path: '/projetos', element: () => <Projects /> },
    { label: 'Categorias', path: '/categorias', element: () => null },
  ]
}

export default Pages
