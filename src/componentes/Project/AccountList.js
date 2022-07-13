import React, { useEffect, useState } from 'react'
import { Backdrop, CircularProgress, Grid } from '@mui/material'
import AccountItem from './AccountItem'
import { listAccounts } from './AccountActions'
import { v4 as uuidv4 } from 'uuid'

import PropTypes from 'prop-types'
export const AccountContext = React.createContext('')
const AccountList = (props) => {
  AccountList.propTypes = {
    reload: PropTypes.bool,
    reloadCallback: PropTypes.func,
  }
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function loadAccounts() {
      setLoading(true)
      let accountsPromise = await listAccounts()
      setAccounts(accountsPromise)
      setLoading(false)
    }

    loadAccounts()
  }, [props.reload])

  return (
    <Grid container spacing={3}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {accounts.map((item) => (
        <AccountContext.Provider key={uuidv4()} value={item}>
          <AccountItem account={item} key={uuidv4()} reloadCallback={props.reloadCallback} />
        </AccountContext.Provider>
      ))}
    </Grid>
  )
}

export default AccountList
