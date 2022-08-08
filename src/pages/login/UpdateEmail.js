import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { updateEmail } from '../../componentes/User/UserActions'

const UpdateEmail = () => {
  const [opened, setOpened] = useState(true)
  const [email, setEmail] = useState('')
  const [backdrop, setBackdrop] = useState(false)
  const handleClose = () => setOpened(false)
  const navigate = useNavigate()
  return (
    <Dialog
      open={opened}
      id={uuidv4()}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Vincular e-mail com a conta</DialogTitle>
      <DialogContent>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogContent id="alert-dialog-description">
          <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
              <TextField
                autoFocus
                disabled={backdrop}
                margin="normal"
                id="email"
                label="E-mail"
                InputLabelProps={{ shrink: true }}
                type="text"
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                fullWidth
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={async () => {
            setBackdrop(true)
            await updateEmail(email, navigate)
            setBackdrop(false)
            handleClose()
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default UpdateEmail
