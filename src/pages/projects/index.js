import React, { useState } from 'react'
import Container from '@mui/material/Container'
import AccountList from '../../componentes/Projects/AccountList'
import InsertActionButton from '../../componentes/Projects/InsertActionButton'

const Projects = () => {
  const [reload, setReload] = useState(false)
  const updateReload = () => {
    setReload(reload ? false : true)
  }
  return (
    <Container>
      <h1>Projetos</h1>
      <AccountList reloadCallback={updateReload} reload={reload} />
      <InsertActionButton reloadCallback={updateReload} />
    </Container>
  )
}

export default Projects
