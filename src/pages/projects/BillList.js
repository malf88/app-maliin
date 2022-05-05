import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'
import BillDatagrip from './BillDatagrip'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import BillInsert from './BillInsert'

const BillList = (props) => {
  BillList.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    openDialog: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }
  const [openBill, setOpenBill] = useState(false)
  const handleClose = () => {
    props.callbackOpenDialog(false)
  }
  const handleOpenInsertBill = (state) => {
    setOpenBill(state)
  }
  return (
    <Dialog open={props.openDialog} onClose={(reason) => {}} fullWidth maxWidth="xl" scroll="body">
      <DialogTitle>
        Lançamentos
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Button
          color="success"
          sx={
            {
              //borderRadius: 100,
            }
          }
          title="Inserir lançamento"
          onClick={() => setOpenBill(true)}
        >
          <AddShoppingCartIcon /> Inserir Lançamento
        </Button>
        <BillInsert
          openDialog={openBill}
          callbackOpenDialog={handleOpenInsertBill}
          accountId={props.accountId}
          reloadCallback={() => {}}
        />
        <BillDatagrip
          accountId={props.accountId}
          reloadCallback={openBill}
          reloadTable={props.openDialog}
        />
      </DialogContent>
      <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
        <Button onClick={handleClose} color="error">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BillList
