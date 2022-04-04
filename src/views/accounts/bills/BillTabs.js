import { CDropdown, CNav, CNavItem, CNavLink } from '@coreui/react'
import moment from 'moment'
import AsyncSelect from 'react-select/async'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BillService from '../../../services/BillService'

const BillTabs = (props) => {
  BillTabs.propTypes = {
    accountId: PropTypes.number,
    loadTableCallback: PropTypes.func,
    clearTableCallback: PropTypes.func,
  }
  const [activeKey, setActiveKey] = useState(1)
  let billService = new BillService()
  const loadOptionsDates = (inputValue, callback) => {
    billService.listBillPeriods(props.accountId).then((response) => {
      const options = []
      response.data.forEach((item) => {
        options.push({
          label: item.month + ' / ' + item.year,
          value: item.month + ' / ' + item.year,
        })
      })
      callback(options)
    })
  }
  return (
    <CNav
      layout="fill"
      className="flex-column flex-sm-row"
      variant="tabs"
      style={{ zIndex: 9999, marginBottom: 30 }}
    >
      <CNavItem>
        <CNavLink
          href="#"
          onClick={(event) => {
            event.preventDefault()
            props.clearTableCallback({ total: {}, bills: [] })
            props.loadTableCallback({
              start: moment().startOf('month').format('YYYY-MM-DD'),
              end: moment().endOf('month').format('YYYY-MM-DD'),
            })
            setActiveKey(1)
          }}
          active={activeKey === 1}
        >
          {moment().format('MMMM')} / {moment().format('YYYY')}
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          onClick={(event) => {
            event.preventDefault()
            props.clearTableCallback({ total: {}, bills: [] })
            props.loadTableCallback({
              start: moment().add(1, 'month').startOf('month').format('YYYY-MM-DD'),
              end: moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'),
            })
            setActiveKey(2)
          }}
          active={activeKey === 2}
        >
          {moment().add(1, 'month').format('MMMM')} / {moment().add(1, 'month').format('YYYY')}
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          onClick={(event) => {
            event.preventDefault()
            props.clearTableCallback({ total: {}, bills: [] })
            props.loadTableCallback({
              start: moment().add(2, 'month').startOf('month').format('YYYY-MM-DD'),
              end: moment().add(2, 'month').endOf('month').format('YYYY-MM-DD'),
            })
            setActiveKey(3)
          }}
          active={activeKey === 3}
        >
          {moment().add(2, 'month').format('MMMM')} / {moment().add(2, 'month').format('YYYY')}
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          href="#"
          onClick={(event) => {
            event.preventDefault()
            props.clearTableCallback({ total: {}, bills: [] })
            props.loadTableCallback({
              start: moment().add(3, 'month').startOf('month').format('YYYY-MM-DD'),
              end: moment().add(3, 'month').endOf('month').format('YYYY-MM-DD'),
            })
            setActiveKey(4)
          }}
          active={activeKey === 4}
        >
          {moment().add(3, 'month').format('MMMM')} / {moment().add(3, 'month').format('YYYY')}
        </CNavLink>
      </CNavItem>
      <CDropdown variant="nav-item">
        <CNavLink
          href="#"
          className="asincselect"
          style={{ zIndex: 1 }}
          active={activeKey === 5}
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          <AsyncSelect
            onChange={(selectValue) => {
              setActiveKey(5)
              props.clearTableCallback({ total: {}, bills: [] })
              props.loadTableCallback({
                start: moment(selectValue.value, 'MM/YYYY').startOf('month').format('YYYY-MM-DD'),
                end: moment(selectValue.value, 'MM/YYYY').endOf('month').format('YYYY-MM-DD'),
              })
            }}
            placeholder="Others Dates"
            id="date"
            isSearchable={true}
            defaultOptions
            style={{ marginTop: 0 }}
            loadOptions={loadOptionsDates}
          />
        </CNavLink>
      </CDropdown>
    </CNav>
  )
}
export default BillTabs
