import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import BillDatagripColumns from '../../componentes/Project/BillDatagripColumns'
import { listBillsBetween } from '../../componentes/Project/BillActions'
import { Backdrop, CircularProgress } from '@mui/material'
import Container from '@mui/material/Container'

const BillDatagrip = (props) => {
  BillDatagrip.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    reloadTable: PropTypes.bool,
  }
  const [billList, setBillList] = useState([])
  const [backdrop, setBackdrop] = useState(false)
  useEffect(() => {
    const getBills = async () => {
      setBackdrop(true)
      let bills = await listBillsBetween(props.accountId, '2022-03-01', '2022-03-28')
      setBillList(bills.bills)
      setBackdrop(false)
    }
    getBills()
  }, [props.reloadTable])
  return (
    <>
      <DataGrid
        autoHeight
        disableColumnSelector
        loading={backdrop}
        sx={{ mt: 5 }}
        density="compact"
        columnBuffer={8}
        rows={billList}
        columns={BillDatagripColumns()}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </>
  )
}

export default BillDatagrip
