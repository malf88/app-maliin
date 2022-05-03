import React from 'react'
import { BoxAmountPrimary } from './BoxAmount'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { GenericBoxError, GenericBoxPrimary, GenericBoxWarning } from './GenericBox'
import moment from 'moment'

const InvoicesBoxes = (props) => {
  InvoicesBoxes.propTypes = {
    billData: PropTypes.object,
  }
  return (
    <Grid container spacing={2} marginTop={2} marginBottom={2}>
      <Grid item xs={12} md={3}>
        <BoxAmountPrimary
          amount={props.billData.total_balance}
          title="Total da fatura"
          icon="credit_card"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <GenericBoxPrimary
          value={moment(props.billData.start_date).utc(false).format('DD/MM/YYYY')}
          title="Início do período"
          icon="event"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <GenericBoxWarning
          value={moment(props.billData.end_date).utc(false).format('DD/MM/YYYY')}
          title="Término do período"
          icon="event"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <GenericBoxError
          value={moment(props.billData.due_date).utc(false).format('DD/MM/YYYY')}
          title="Vencimento"
          icon="event"
        />
      </Grid>
    </Grid>
  )
}

export default InvoicesBoxes
