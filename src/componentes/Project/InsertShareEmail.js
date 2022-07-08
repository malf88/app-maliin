import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, TextField } from '@mui/material'
import { sharedAccountByEmail } from './AccountActions'
import { toast } from 'react-toastify'
import ShareIcon from '@mui/icons-material/Share'

const InsertShareEmail = (props) => {
  InsertShareEmail.propTypes = {
    setBackdrop: PropTypes.func,
    accountId: PropTypes.number,
    reloadGrid: PropTypes.func,
  }

  const [email, setEmail] = useState('')
  const saveEmail = async () => {
    props.setBackdrop(true)
    await sharedAccountByEmail(props.accountId, email)
      .then((response) => {
        props.reloadGrid()
        toast.success('Conta compartilhada com sucesso!')
        setEmail('')
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.error(
            'Já compartilhado com o e-mail informado ou você é dono desta conta! (' + email + ')',
          )
        } else {
          toast.error(error.message)
        }

        props.setBackdrop(false)
      })
    //
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            fullWidth
            value={email}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button size="medium" fullWidth onClick={() => saveEmail()} color="success">
            <ShareIcon sx={{ mr: 1 }} /> Compartilhar
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default InsertShareEmail
