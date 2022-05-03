import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'
import BillDatagrip from './BillDatagrip'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const BillList = (props) => {
  BillList.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    openDialog: PropTypes.bool,
    callbackOpenDialog: PropTypes.func,
  }

  const handleClose = () => {
    props.callbackOpenDialog(false)
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
        <BillDatagrip
          accountId={props.accountId}
          reloadCallback={props.reloadCallback}
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
