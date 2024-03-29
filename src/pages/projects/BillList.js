import React, { useContext, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'
import BillDatagrip from './BillDatagrip'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { AccountContext } from '../../componentes/Project/AccountList'
import ListAltIcon from '@mui/icons-material/ListAlt'

const BillList = (props) => {
  BillList.propTypes = {
    reloadCallback: PropTypes.func,
  }

  const [openBill, setOpenBill] = useState(false)
  const handleClose = () => {
    setOpenBill(false)
    props.reloadCallback()
  }
  const account = useContext(AccountContext)

  return (
    <>
      <Button color="secondary" title="Lista de lançamentos" onClick={() => setOpenBill(true)}>
        <ListAltIcon />
      </Button>
      <Dialog open={openBill} onClose={(reason) => {}} fullWidth maxWidth="xl" scroll="body">
        <DialogTitle>
          Lançamentos do projeto {account.name}
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
            accountId={account.id}
            reloadCallback={setOpenBill}
            reloadTable={openBill}
          />
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

export default BillList
