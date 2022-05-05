import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import BillDatagripColumns from '../../componentes/Project/BillDatagripColumns'
import { listBillsBetween } from '../../componentes/Project/BillActions'
import { Backdrop, CircularProgress, Tab, Tabs } from '@mui/material'

import moment from 'moment'
import Box from '@mui/material/Box'
import SelectPeriod from '../../componentes/Project/SelectPeriod'
import BillsTotal from '../../componentes/Project/BillsTotal'
import { v4 } from 'uuid'

const BillDatagrip = (props) => {
  BillDatagrip.propTypes = {
    reloadCallback: PropTypes.func,
    accountId: PropTypes.number,
    reloadTable: PropTypes.bool,
  }
  const [billList, setBillList] = useState([])
  const [billTotal, setBillTotal] = useState({
    total_cash_in: 0,
    total_cash_out: 0,
    total_estimated: 0,
    total_paid: 0,
  })
  const [customPeriod, setCustomPeriod] = useState(0)
  const [backdrop, setBackdrop] = useState(false)
  const [loadGrid, setLoadGrid] = useState(false)
  const [tab, setTab] = useState(moment().format('YYYY-MM'))
  const [dateInterval, setDateInterval] = useState({
    start: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().endOf('month').format('YYYY-MM-DD'),
  })
  const getAccountId = () => {
    return props.accountId
  }
  useEffect(() => {
    const getBills = async () => {
      setBackdrop(true)
      //setBillList([])
      let bills = await listBillsBetween(props.accountId, dateInterval.start, dateInterval.end)
      setBillList(bills.bills)
      setBillTotal(bills.total)
      setBackdrop(false)
    }
    getBills()
  }, [dateInterval.start, dateInterval.end, loadGrid, props.accountId, props.reloadCallback])

  const handleChangeTable = (event, newValue) => {
    let dateSelected
    if (newValue === 'custom') {
      setTab(newValue)
    }
    if (newValue !== 'custom') {
      setCustomPeriod(0)
      setTab(newValue)
      dateSelected = moment(newValue + '-01')
      setDateInterval({
        start: dateSelected.startOf('month').format('YYYY-MM-DD'),
        end: dateSelected.endOf('month').format('YYYY-MM-DD'),
      })
    }
  }
  const OtherPeriods = useMemo(
    () =>
      React.forwardRef(function ButtonBase(props, ref) {
        return (
          <SelectPeriod
            ref={ref}
            name="customPeriod"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 500,
              width: 100,
              color: tab !== 'custom' ? '#666' : '#1976d2',
              textAlign: 'center',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            }}
            value={customPeriod}
            onChange={(event) => {
              if (event.target.value === 0) return
              handleChangeTable(event, 'custom')
              setCustomPeriod(event.target.value)
              setDateInterval({
                start: moment(event.target.value + '-01')
                  .startOf('month')
                  .format('YYYY-MM-DD'),
                end: moment(event.target.value + '-01')
                  .endOf('month')
                  .format('YYYY-MM-DD'),
              })
            }}
            accountid={getAccountId()}
          />
        )
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customPeriod],
  )

  const listMonth = () => {
    let tabs = []
    // eslint-disable-next-line react/display-name

    tabs.push(
      <Tab
        key={moment().format('MM/YYYY')}
        label={moment().format('MM/YYYY')}
        id={'m' + moment().month()}
        value={moment().format('YYYY-MM')}
        title={moment().format('MM/YYYY')}
      />,
      <Tab
        key={moment().add(1, 'months').format('MM/YYYY')}
        label={moment().add(1, 'months').format('MM/YYYY')}
        id={'m' + moment().add(1, 'months').month()}
        value={moment().add(1, 'months').format('YYYY-MM')}
        title={moment().add(1, 'months').format('MM/YYYY')}
      />,
      <Tab
        key={moment().add(2, 'months').format('MM/YYYY')}
        label={moment().add(2, 'months').format('MM/YYYY')}
        id={'m' + moment().add(2, 'months').month()}
        value={moment().add(2, 'months').format('YYYY-MM')}
        title={moment().add(2, 'months').format('MM/YYYY')}
      />,
      <Tab key={'custom'} id={'mcustom'} value={'custom'} component={OtherPeriods} />,
    )
    return tabs
  }
  const loadDatagrid = () => {
    setLoadGrid(v4())
  }
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={handleChangeTable}
          aria-label="Meses com lançamento"
          variant="scrollable"
          title="Período"
        >
          {listMonth()}
        </Tabs>
      </Box>
      <BillsTotal totals={billTotal} />
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <DataGrid
        autoHeight
        disableColumnSelector
        sx={{ mt: 5 }}
        density="compact"
        columnBuffer={8}
        rows={billList}
        columns={BillDatagripColumns(loadDatagrid, props.accountId)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
      />
    </>
  )
}

export default BillDatagrip
