import Home from '../pages/home'
import React from 'react'
import Projects from '../pages/projects'
import Categories from '../pages/categories'
import HomeIcon from '@mui/icons-material/Home'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import CategoryIcon from '@mui/icons-material/Category'

const Pages = () => {
  return [
    { label: 'Home', path: '/', element: () => <Home />, icon: <HomeIcon /> },
    { label: 'Projetos', path: '/projetos', element: () => <Projects />, icon: <FolderCopyIcon /> },
    {
      label: 'Categorias',
      path: '/categorias',
      element: () => <Categories />,
      icon: <CategoryIcon />,
    },
  ]
}

export default Pages
