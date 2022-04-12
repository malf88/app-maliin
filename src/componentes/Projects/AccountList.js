import React from 'react'
import { Grid } from '@mui/material'
import AccountItem from './AccountItem'
import { listAccounts } from './AccountActions'
import { v4 as uuidv4 } from 'uuid'
const AccountList = () => (
  <Grid container spacing={3}>
    {listAccounts().map((item) => (
      <AccountItem account={item} key={uuidv4()} />
    ))}
  </Grid>
)

export default AccountList
