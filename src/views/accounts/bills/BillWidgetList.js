import { ShimmerThumbnail } from 'react-shimmer-effects'
import { CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import NumberFormat from 'react-number-format'
import React from 'react'
import PropTypes from 'prop-types'

const BillWidgetList = (props) => {
  BillWidgetList.propTypes = {
    billList: PropTypes.object,
    loadBillList: PropTypes.bool,
  }
  return (
    <>
      <div className="col-md-3">
        {props.loadBillList ? (
          <ShimmerThumbnail height={95} width={258.5} rounded />
        ) : (
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={icon.cilPlus} height={24} />}
            title="Cash in"
            value={
              <NumberFormat
                style={props.billList.total.total_cash_in >= 0 ? style.credit : style.debit}
                value={props.billList.total.total_cash_in}
                displayType="text"
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            }
          />
        )}
      </div>
      <div className="col-md-3">
        {props.loadBillList ? (
          <ShimmerThumbnail height={95} width={258.5} rounded />
        ) : (
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            style={{ zIndex: '1 important!' }}
            icon={<CIcon icon={icon.cilMinus} height={24} />}
            title="Cash out"
            value={
              <NumberFormat
                style={props.billList.total.total_cash_out >= 0 ? style.credit : style.debit}
                value={props.billList.total.total_cash_out}
                displayType="text"
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            }
          />
        )}
      </div>
      <div className="col-md-3">
        {props.loadBillList ? (
          <ShimmerThumbnail height={95} width={258.5} rounded />
        ) : (
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            style={{ zIndex: '1 important!' }}
            icon={<CIcon icon={icon.cilCalculator} height={24} />}
            title="Total estimated"
            value={
              <NumberFormat
                style={props.billList.total.total_estimated >= 0 ? style.credit : style.debit}
                value={props.billList.total.total_estimated}
                displayType="text"
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            }
          />
        )}
      </div>
      <div className="col-md-3">
        {props.loadBillList ? (
          <ShimmerThumbnail height={95} width={258.5} rounded />
        ) : (
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={icon.cilMoney} height={24} />}
            title="Total available"
            style={{ zIndex: '1 important!' }}
            value={
              <NumberFormat
                style={props.billList.total.total_paid >= 0 ? style.credit : style.debit}
                value={props.billList.total.total_paid}
                displayType="text"
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'R$ '}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            }
          />
        )}
      </div>
    </>
  )
}
const style = {
  debit: {
    color: '#be0b0b',
  },
  credit: {
    color: '#000b7e',
  },
}
export default BillWidgetList
