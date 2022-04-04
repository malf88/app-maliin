import {
  CButton,
  CButtonGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CWidgetStatsF,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { promiseLoader } from '../../utils/assets/Alerts'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import * as icon from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import { ShimmerTable, ShimmerThumbnail } from 'react-shimmer-effects'
import { columnsBill } from './ColumnListBill'
import SearchField from '../../utils/assets/SearchField'
import { paidBill, removeBill } from '../../../actions/BillAction'
import { ConfirmBox } from '../../utils/components/ConfirmBox'
import { BillEdit } from './BillEdit'
import InvoiceService from '../../../services/InvoiceService'
export const Invoices = (props) => {
  Invoices.propTypes = {
    invoiceId: PropTypes.number,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    invoiceIdCallback: PropTypes.func,
  }
  const [billList, setBillList] = useState({
    total: {},
    bills: [],
    total_balance: 0.0,
  })
  const [visibleEditBox, setVisibleEditBox] = useState(false)
  const [visibleDeleteBox, setVisibleDeleteBox] = useState(false)
  const [visiblePaidBillBox, setVisiblePaidBillBox] = useState(false)
  const [loadList, setLoadList] = useState(false)
  const [billId, setBillId] = useState(null)

  const onCloseModal = () => {
    setBillList({
      total: {},
      bills: [],
    })
    props.invoiceIdCallback(null)
    props.modalVisibleCallback(false)
  }
  let invoiceService = new InvoiceService()
  const loaderBill = () => {
    return invoiceService.invoice(props.invoiceId).then((response) => {
      setBillList(response.data)
      setLoadList(false)
    })
  }

  useEffect(() => {
    async function fetchData() {
      if (props.invoiceId && props.modalVisibleState) {
        setLoadList(true)
        let requestBillList = loaderBill()
        if (billList.bills.length === 0) promiseLoader(requestBillList)
      }
    }
    fetchData()
  }, [props.modalVisibleState, visibleEditBox])

  const rowsTableBills = (bills) => {
    let billRow = []
    bills.forEach((item) => {
      billRow.push({
        id: '#' + item.id,
        description: item.description,
        category: item.category.name,
        date: moment(item.date).format('DD/MM/YYYY'),
        due_date: moment(billList.due_date).format('DD/MM/YYYY'),
        amount: (
          <NumberFormat
            style={item.amount >= 0 ? style.credit : style.debit}
            value={item.amount.replace('.', ',')}
            displayType="text"
            thousandSeparator={'.'}
            decimalSeparator={','}
            prefix={'R$ '}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        ),
        actions: item.pay_day ? (
          <CButtonGroup>
            <CButton
              disabled={true}
              color="success"
              size="sm"
              title="Paid"
              className={!item.credit_card_id ? 'rounded-end' : ''}
            >
              PAID!
            </CButton>
          </CButtonGroup>
        ) : (
          <CButtonGroup>
            <CButton
              color="danger"
              onClick={() => {
                setBillId(item.id)
                setVisibleDeleteBox(true)
              }}
              size="sm"
              title="Cancel"
            >
              <CIcon icon={icon.cilX} />
            </CButton>
            <CButton
              color="warning"
              size="sm"
              title="Edit"
              onClick={() => {
                setVisibleEditBox(true)
                setBillId(item.id)
              }}
            >
              <CIcon icon={icon.cilPen} />
            </CButton>
            <CButton
              color="success"
              size="sm"
              title="Paid"
              onClick={() => {
                setBillId(item.id)
                setVisiblePaidBillBox(true)
              }}
            >
              <CIcon icon={icon.cilMoney} />
            </CButton>
          </CButtonGroup>
        ),
      })
    })
    return billRow
  }
  const options = {
    hideSizePerPage: true,
    sizePerPageList: [
      {
        text: '15',
        value: 15,
      },
      {
        text: 'All',
        value: rowsTableBills(billList.bills).length,
      },
    ],
  }

  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      onClosePrevented={onCloseModal}
      size="xl"
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>
          <CIcon icon={icon.cilCreditCard} size="xl" style={{ marginRight: 15 }} />
          List bill to invoice #{props.invoiceId}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <div className="col-md-3">
            {loadList ? (
              <ShimmerThumbnail height={95} width={258.5} rounded />
            ) : (
              <CWidgetStatsF
                className="mb-3"
                color="info"
                icon={<CIcon icon={icon.cilCreditCard} height={24} />}
                title="Total invoice"
                value={
                  <NumberFormat
                    style={billList.total_balance >= 0 ? style.credit : style.debit}
                    value={billList.total_balance}
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
            {loadList ? (
              <ShimmerThumbnail height={95} width={258.5} rounded />
            ) : (
              <CWidgetStatsF
                className="mb-3"
                color="info"
                icon={<CIcon icon={icon.cilCalendar} height={24} />}
                title="Due date"
                value={moment(billList.due_date).format('DD/MM/YYYY')}
              />
            )}
          </div>
        </CRow>
        <CRow>
          <BillEdit
            billId={billId}
            billIdCallback={setBillId}
            modalVisibleCallback={setVisibleEditBox}
            modalVisibleState={visibleEditBox}
            accountId={1}
          />
          <ConfirmBox
            setVisible={setVisibleDeleteBox}
            visible={visibleDeleteBox}
            message="Do you really want to remove the registry?"
            cancelLabel="No"
            okLabel="Yes"
            onOk={() => {
              removeBill(billId, loaderBill)
            }}
            onCancel={() => {}}
          />
          <ConfirmBox
            setVisible={setVisiblePaidBillBox}
            visible={visiblePaidBillBox}
            message="Do you really want paid this bill?"
            cancelLabel="No"
            okLabel="Yes"
            onCancel={() => {}}
            onOk={() => {
              paidBill(billId, loaderBill)
            }}
          />
        </CRow>
        {loadList ? (
          <ShimmerTable row={5} col={5} />
        ) : (
          <ToolkitProvider
            keyField="id"
            data={rowsTableBills(billList.bills)}
            columns={columnsBill}
            search
            bootstrap4
          >
            {(props) => (
              <div>
                {/* eslint-disable-next-line react/prop-types */}
                <SearchField {...props.searchProps} />
                <hr />

                <BootstrapTable
                  noDataIndication="No registry"
                  bordered={false}
                  striped={true}
                  hover={true}
                  wrapperClasses="table-responsive-md"
                  {
                    /* eslint-disable-next-line react/prop-types */
                    ...props.baseProps
                  }
                  pagination={paginationFactory(options)}
                />
              </div>
            )}
          </ToolkitProvider>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            onCloseModal()
          }}
        >
          Close
        </CButton>
      </CModalFooter>
    </CModal>
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
