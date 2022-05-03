import React from 'react'
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from '@mui/material'
import BankIcon from '@mui/icons-material/AccountBalance'
import AgencyIcon from '@mui/icons-material/AccountBox'
import AccountIcon from '@mui/icons-material/AccountBalanceWallet'
import BalanceIcon from '@mui/icons-material/PointOfSale'
import EstimatedIcon from '@mui/icons-material/AttachMoney'
import PropTypes from 'prop-types'
import AccountActionsButtons from './AccountActionsButtons'
import { buscarBancos } from '../../const/Bancos'
import Currency from '../formatter/Currency'

const AccountItem = (props) => {
  AccountItem.propTypes = {
    account: PropTypes.object,
    reloadCallback: PropTypes.func,
  }
  const banco = buscarBancos(props.account.bank)
  return (
    <Grid item xs={12} md={4} key={props.account.id}>
      <Paper elevation={3}>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            alignContent: 'center',
          }}
          subheader={
            <ListSubheader sx={{ backgroundColor: '#067bbb', color: '#FFF', fontSize: 16 }}>
              {props.account.name}
            </ListSubheader>
          }
        >
          <AccountActionsButtons
            accountId={props.account.id}
            reloadCallback={props.reloadCallback}
          />
          <ListItem>
            <ListItemIcon>
              <BankIcon />
            </ListItemIcon>
            <ListItemText
              id="bank-account"
              primary="Banco"
              secondary={banco ? banco.label : 'Banco não encontrado'}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AgencyIcon />
            </ListItemIcon>
            <ListItemText id="agency-account" secondary={props.account.agency} primary="Agência" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText id="account-account" secondary={props.account.account} primary="Conta" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BalanceIcon />
            </ListItemIcon>
            <ListItemText
              id="total_balance-account"
              secondary={
                <span style={props.account.total_balance >= 0 ? styles.positive : styles.negative}>
                  {Currency(props.account.total_balance)}
                </span>
              }
              primary="Valor atual"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EstimatedIcon />
            </ListItemIcon>
            <ListItemText
              id="total_estimated-account"
              secondary={
                <span
                  style={props.account.total_estimated >= 0 ? styles.positive : styles.negative}
                >
                  {Currency(props.account.total_estimated)}
                </span>
              }
              primary="Valor estimado"
            />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  )
}
const styles = {
  positive: {
    color: '#3facef',
  },
  negative: {
    color: '#F00',
  },
}
export default AccountItem
