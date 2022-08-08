import React, { useState } from 'react'
import Container from '@mui/material/Container'
import AccountList from '../../componentes/Project/AccountList'
import InsertActionButton from '../../componentes/Project/InsertActionButton'

const Projects = () => {
  const [reload, setReload] = useState(false)
  const updateReload = () => {
    setReload(reload ? false : true)
  }
  return (
    <Container sx={{ marginLeft: 1 }}>
      <h1>Projetos</h1>
      <AccountList reloadCallback={updateReload} reload={reload} />
      <InsertActionButton reloadCallback={updateReload} />
    </Container>
  )
}

export default Projects
