import React, { useEffect, useState } from 'react'
import { CircularProgress, Fade, Grid } from '@mui/material'
import AccountItem from './AccountItem'
import { listAccounts } from './AccountActions'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
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
  if (!loading) {
    return (
      <Grid container spacing={3}>
        {accounts.map((item) => (
          <AccountItem account={item} key={uuidv4()} reloadCallback={props.reloadCallback} />
        ))}
      </Grid>
    )
  } else {
    return (
      <Fade in={loading} unmountOnExit>
        <CircularProgress sx={{ mt: 2 }} />
      </Fade>
    )
  }
}

export default AccountList
