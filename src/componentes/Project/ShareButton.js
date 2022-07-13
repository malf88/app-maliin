import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import ShareDatagrid from './ShareDatagrid'
import { canShareAccount } from '../../library/Policy'
import { AccountContext } from './AccountList'

const ShareButton = (props) => {
  ShareButton.propTypes = {
    accountId: PropTypes.number,
  }
  const [openBill, setOpenBill] = useState(false)
  const handleClose = () => {
    setOpenBill(false)
  }
  const account = useContext(AccountContext)
  return (
    <>
      <Button
        key={uuidv4}
        disabled={!canShareAccount(account)}
        variant="contained"
        color="success"
        title="Compartilhar"
        size="small"
        onClick={() => setOpenBill(true)}
      >
        <ShareIcon />
      </Button>
      <Dialog open={openBill} onClose={(reason) => {}} fullWidth maxWidth="sm" scroll="body">
        <DialogTitle>
          Compartilhamentos
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
          <ShareDatagrid accountId={props.accountId} openModalShare={openBill} />
        </DialogContent>
        <DialogActions sx={{ m: 'auto', mt: 3, justifyContent: 'center', display: 'flex' }}>
          <Button onClick={handleClose} color="error">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ShareButton
