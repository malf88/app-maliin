import {
  CButton,
  CButtonGroup,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BillService from '../../../services/BillService'
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
import { ShimmerTable } from 'react-shimmer-effects'
import BillTabs from './BillTabs'
import BillWidgetList from './BillWidgetList'
import { columnsBill } from './ColumnListBill'
import SearchField from '../../utils/assets/SearchField'
import { paidBill, removeBill } from '../../../actions/BillAction'
import { ConfirmBox } from '../../utils/components/ConfirmBox'
import { paidInvoice } from '../../../actions/InvoiceAction'
import { BillEdit } from './BillEdit'
import { Invoices } from './Invoices'
export const Bills = (props) => {
  Bills.propTypes = {
    accountId: PropTypes.number,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
    modalVisibleInsertCallback: PropTypes.func,
    modalVisibleInsertState: PropTypes.bool,
  }
  const [billList, setBillList] = useState({
    total: {},
    bills: [],
  })
  const [visibleInvoiceBox, setVisibleInvoiceBox] = useState(false)
  const [visibleEditBox, setVisibleEditBox] = useState(false)
  const [visibleDeleteBox, setVisibleDeleteBox] = useState(false)
  const [visiblePaidBillBox, setVisiblePaidBillBox] = useState(false)
  const [visiblePaidInvoiceBox, setVisiblePaidInvoiceBox] = useState(false)
  const [billId, setBillId] = useState(null)
  const [loadBillList, setLoadBillList] = useState(false)
  const [dateListBills, setDateListBills] = useState({
    start: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().endOf('month').format('YYYY-MM-DD'),
  })

  const onCloseModal = () => {
    setBillList({
      total: {},
      bills: [],
    })
    props.accountIdCallback(null)
    props.modalVisibleCallback(false)
  }
  const loaderBill = () => {
    setLoadBillList(true)
    let requestBillList = billService.listBill(props.accountId, dateListBills).then((response) => {
      setBillList(response.data)
      setLoadBillList(false)
    })
    return requestBillList
  }
  let billService = new BillService()
  useEffect(() => {
    async function fetchData() {
      if (props.accountId && props.modalVisibleState && !props.modalVisibleInsertState) {
        let requestBillList = loaderBill()
        if (billList.bills.length === 0) promiseLoader(requestBillList)
      }
    }
    fetchData()
  }, [props.modalVisibleState, dateListBills, props.modalVisibleInsertState, visibleEditBox])

  const rowsTableBills = (bills) => {
    let billRow = []
    bills.forEach((item) => {
      billRow.push({
        C: item.credit_card_id ? <CIcon icon={icon.cilCreditCard} /> : '',
        id: '#' + item.id,
        description: item.description,
        category: !item.credit_card_id ? item.category.name : 'Credit Card',
        date: moment(item.date).format('DD/MM/YYYY'),
        due_date: moment(item.due_date).format('DD/MM/YYYY'),
        amount:
          item.amount != null ? (
            <NumberFormat
              style={item.amount >= 0 ? style.credit : style.debit}
              value={item.amount.toString().replace('.', ',')}
              displayType="text"
              thousandSeparator={'.'}
              decimalSeparator={','}
              prefix={'R$ '}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          ) : (
            'R$ 0,00'
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
            <CButton
              hidden={!item.credit_card_id}
              color="info"
              size="sm"
              title="Invoice"
              onClick={(event) => {
                setBillId(item.id)
                setVisibleInvoiceBox(true)
              }}
            >
              <CIcon icon={icon.cilSpreadsheet} />
            </CButton>
          </CButtonGroup>
        ) : (
          <CButtonGroup>
            <CButton
              hidden={item.credit_card_id}
              color="danger"
              onClick={(event) => {
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
              hidden={item.credit_card_id}
              size="sm"
              title="Edit"
              onClick={(event) => {
                setVisibleEditBox(true)
                setBillId(item.id)
              }}
            >
              <CIcon icon={icon.cilPen} />
            </CButton>
            <CButton
              className="rounded-start"
              hidden={!item.credit_card_id}
              color="info"
              size="sm"
              title="Invoice"
              onClick={(event) => {
                setBillId(item.id)
                setVisibleInvoiceBox(true)
              }}
            >
              <CIcon icon={icon.cilSpreadsheet} />
            </CButton>
            <CButton
              color="success"
              size="sm"
              title="Paid"
              onClick={(event) => {
                if (!item.credit_card_id) {
                  setBillId(item.id)
                  setVisiblePaidBillBox(true)
                } else {
                  setBillId(item.id)
                  setVisiblePaidInvoiceBox(true)
                }
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
        <CModalTitle>List bill to #{props.accountId}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <Invoices
            modalVisibleState={visibleInvoiceBox}
            modalVisibleCallback={setVisibleInvoiceBox}
            invoiceId={billId}
            invoiceIdCallback={setBillId}
          />
          <BillEdit
            billId={billId}
            billIdCallback={setBillId}
            modalVisibleCallback={setVisibleEditBox}
            modalVisibleState={visibleEditBox}
            accountId={props.accountId}
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
          <ConfirmBox
            setVisible={setVisiblePaidInvoiceBox}
            visible={visiblePaidInvoiceBox}
            message="Do you really want paid this invoice?"
            cancelLabel="No"
            okLabel="Yes"
            onCancel={() => {}}
            onOk={() => {
              paidInvoice(billId, loaderBill)
            }}
          />
          <CCol md={3} style={{ marginBottom: 15 }}>
            <CButton
              className="btn btn-success btn-md rounded-circle"
              onClick={() => {
                props.modalVisibleInsertCallback(true)
              }}
            >
              <CIcon icon={icon.cilPlus} />
            </CButton>
          </CCol>
        </CRow>
        <div className="row">
          <BillTabs
            accountId={props.accountId}
            clearTableCallback={setBillList}
            loadTableCallback={setDateListBills}
          />
        </div>
        <CRow>
          <BillWidgetList billList={billList} loadBillList={loadBillList} />
        </CRow>
        {loadBillList ? (
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
