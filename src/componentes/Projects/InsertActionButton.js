import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import AccountInsertForm from '../../pages/projects/AccountInsertForm'
const InsertActionButton = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleOpen = (state) => {
    setOpen(state)
  }
  return (
    <>
      <SpeedDial
        ariaLabel="Ações para projetos"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Inserir conta"
          onClick={handleClickOpen}
        />
      </SpeedDial>
      <AccountInsertForm handleOpen={handleOpen} open={open} />
    </>
  )
}

export default InsertActionButton
