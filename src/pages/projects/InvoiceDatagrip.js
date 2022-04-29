import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, CircularProgress } from '@mui/material'

import moment from 'moment'
import { v4 } from 'uuid'
import { listBills } from '../../componentes/Project/InvoiceActions'
import InvoiceDatagripColumns from '../../componentes/Project/InvoiceDatagripColumns'
import InvoiceBoxes from '../../componentes/Project/InvoiceBoxes'

const InvoiceDatagrip = (props) => {
  InvoiceDatagrip.propTypes = {
    reloadCallback: PropTypes.func,
    invoiceId: PropTypes.number,
    accountId: PropTypes.number,
  }
  const [billData, setBillData] = useState({ bills: [], total_balance: 0 })

  const [backdrop, setBackdrop] = useState(false)
  const [loadGrid, setLoadGrid] = useState(false)
  const [dateInterval, setDateInterval] = useState({
    start: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().endOf('month').format('YYYY-MM-DD'),
  })
  const getAccountId = () => {
    return props.invoiceId
  }
  useEffect(() => {
    const getBills = async () => {
      setBackdrop(true)
      let bills = await listBills(props.invoiceId)

      setBillData(bills)
      setBackdrop(false)
    }
    getBills()
  }, [dateInterval.start, dateInterval.end, loadGrid])

  const loadDatagrid = () => {
    setLoadGrid(v4())
  }
  return (
    <>
      <InvoiceBoxes billData={billData} />
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DataGrid
        autoHeight
        disableColumnSelector
        sx={{ mt: 5 }}
        density="compact"
        columnBuffer={8}
        rows={billData.bills}
        columns={InvoiceDatagripColumns(loadDatagrid, props.accountId)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </>
  )
}

export default InvoiceDatagrip
