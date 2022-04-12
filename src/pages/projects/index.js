import React from 'react'
import Container from '@mui/material/Container'
import AccountList from '../../componentes/Projects/AccountList'
import InsertActionButton from '../../componentes/Projects/InsertActionButton'

const Projects = () => {
  return (
    <Container>
      <h1>Projetos</h1>
      <AccountList />
      <InsertActionButton />
    </Container>
  )
}

export default Projects
