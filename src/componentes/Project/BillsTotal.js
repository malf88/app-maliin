import React from 'react'
import { BoxAmountError, BoxAmountPrimary, BoxAmountSuccess, BoxAmountWarning } from './BoxAmount'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'

const BillsTotal = (props) => {
  BillsTotal.propTypes = {
    totals: PropTypes.object,
  }

  return (
    <Grid container spacing={2} marginTop={2} marginBottom={2}>
      <Grid item xs={12} md={3}>
        <BoxAmountSuccess icon="add" title="Entradas" amount={props.totals.total_cash_in} />
      </Grid>
      <Grid item xs={12} md={3}>
        <BoxAmountError icon="remove" title="Saídas" amount={props.totals.total_cash_out} />
      </Grid>
      <Grid item xs={12} md={3}>
        <BoxAmountWarning
          icon="upcoming"
          title="Orçamento estimado"
          amount={props.totals.total_estimated}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <BoxAmountPrimary
          icon="swap_horiz"
          title="Total pago/recebido"
          amount={props.totals.total_paid}
        />
      </Grid>
    </Grid>
  )
}

export default BillsTotal
