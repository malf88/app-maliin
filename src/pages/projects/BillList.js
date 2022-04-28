import React from 'react'
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  TextField,
} from '@mui/material'
import CreditCardList from './CreditCardList'
import PropTypes from 'prop-types'
import BillDatagrip from './BillDatagrip'

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
      <DialogTitle>Lançamentos</DialogTitle>

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
