import React from 'react'
import CurrencyFormat from 'react-currency-format'
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

const AccountItem = (props) => {
  AccountItem.propTypes = {
    account: PropTypes.object,
  }
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
          <AccountActionsButtons />
          <ListItem>
            <ListItemIcon>
              <BankIcon />
            </ListItemIcon>
            <ListItemText id="bank-account" primary="Banco" secondary={props.account.bank} />
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
                <CurrencyFormat
                  value={props.account.total_balance.replace('.', ',')}
                  displayType={'text'}
                  fixedDecimalScale={true}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'R$ '}
                  renderText={(value) => (
                    <span
                      style={props.account.total_balance >= 0 ? styles.positive : styles.negative}
                    >
                      {value}
                    </span>
                  )}
                />
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
                <CurrencyFormat
                  value={props.account.total_estimated.replace('.', ',')}
                  displayType={'text'}
                  thousandSeparator={'.'}
                  fixedDecimalScale={true}
                  isNumericString={true}
                  decimalSeparator={','}
                  prefix={'R$ '}
                  renderText={(value) => (
                    <span
                      style={props.account.total_estimated >= 0 ? styles.positive : styles.negative}
                    >
                      {value}
                    </span>
                  )}
                />
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
