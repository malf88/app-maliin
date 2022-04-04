import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import CategoryService from '../../../services/CategoryService'
import AsyncSelect from 'react-select/async'
import CreditCardService from '../../../services/CreditCardService'
import moment from 'moment'
import CurrencyInput from 'react-currency-input-field'
import BillService from '../../../services/BillService'
import { promiseLoader } from '../../utils/assets/Alerts'
import BootstrapTable from 'react-bootstrap-table-next'
import { columnsChildBill } from './ColumnListBill'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import NumberFormat from 'react-number-format'
import { updateBill } from '../../../actions/BillAction'
import { ConfirmBox } from '../../utils/components/ConfirmBox'
export const BillEdit = (props) => {
  BillEdit.propTypes = {
    billId: PropTypes.number,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    billIdCallback: PropTypes.func,
    accountId: PropTypes.number,
  }
  const [visibleUpdateChild, setVisibleUpdateChild] = useState(false)
  const [childBillList, setChildBillList] = useState([])
  const [disableInput, setDisableInput] = useState(true)
  const [dueDateDisabled, setDueDateDisabled] = useState(false)
  const [formValue, setFormValue] = useState({
    type: '',
    description: '',
    amount: '0,00',
    paidOut: '',
    date: moment().format('YYYY-MM-DD'),
    due_date: '',
    credit_card_id: null,
    category_id: null,
    barcode: '',
    update_childs: false,
  })
  const setFormValueDefault = (formValue) => {
    setFormValue(formValue)
  }
  const setValueDisableDataDue = (dataValue) => {
    setDueDateDisabled(dataValue)
  }
  useEffect(() => {
    setDisableInput(true)
    async function fetchData() {
      if (props.billId && props.modalVisibleState) {
        let billService = new BillService()
        let promisseBill = billService.bill(props.billId).then((response) => {
          formValue.amount =
            response.data.amount >= 0 ? response.data.amount : response.data.amount * -1
          formValue.barcode = response.data.barcode
          formValue.date = response.data.date
          formValue.due_date = response.data.due_date
          formValue.category_id = {
            label: response.data.category.name,
            value: response.data.category.id,
          }
          if (response.data.credit_card_id) {
            formValue.credit_card_id = {
              label: response.data.credit_card.name,
              value: response.data.credit_card.id,
            }
            setValueDisableDataDue(true)
          }
          formValue.type =
            response.data.amount >= 0
              ? { label: 'Credit', value: 1 }
              : { label: 'Debit', value: -1 }
          formValue.paidOut = response.data.pay_day !== null
          formValue.description = response.data.description
          setFormValueDefault(formValue)
          setDisableInput(false)
          setChildBillList(response.data.bill_parent)
        })
        promiseLoader(promisseBill)
      }
    }
    fetchData()
  }, [formValue, props.billId, props.modalVisibleState])

  const onCloseModal = () => {
    formValue.type = ''
    formValue.description = ''
    formValue.amount = '0,00'
    formValue.paidOut = false
    formValue.date = ''
    formValue.due_date = ''
    formValue.credit_card_id = null
    formValue.category_id = null
    formValue.barcode = ''
    formValue.portion = ''
    setChildBillList([])
    setDueDateDisabled(false)
    setFormValueDefault(formValue)
    props.modalVisibleCallback(false)
  }
  let categoryService = new CategoryService()
  let creditcardService = new CreditCardService()
  const loadOptionsCategory = (inputValue, callback) => {
    categoryService.getCategories(props.accountId).then((response) => {
      const options = []
      response.data.forEach((item) => {
        options.push({
          label: item.name,
          value: item.id,
        })
      })
      callback(options)
    })
  }
  const loadOptionsCreditCard = (inputValue, callback) => {
    creditcardService.getCreditCards(props.accountId).then((response) => {
      const options = []
      response.data.forEach((item) => {
        options.push({
          label: item.name,
          value: item.id,
        })
      })
      callback(options)
    })
  }
  const rowsTableBills = (bills) => {
    let billRow = []
    bills.forEach((item) => {
      billRow.push({
        id: '#' + item.id,
        description: item.description,
        category: item.category.name,
        date: moment(item.date).format('DD/MM/YYYY'),
        due_date: moment(item.due_date).format('DD/MM/YYYY'),
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
        paid: item.pay_day ? (
          <CButton
            disabled={true}
            color="success"
            size="sm"
            title="Paid"
            className={!item.credit_card_id ? 'rounded-end' : ''}
          >
            PAID!
          </CButton>
        ) : (
          ''
        ),
      })
    })
    return billRow
  }
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      backdrop="static"
      onClosePrevented={onCloseModal}
      size="lg"
    >
      <CModalHeader onClose={onCloseModal} className="bg-info">
        <CModalTitle>
          <CIcon icon={icon.cilPen} size="xl" className="text-white" /> Edit bill #{props.billId}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row">
          <div className="row">
            <div className="col-12 mb-12 col-sm-3" style={{ marginBottom: '5px' }}>
              <CFormLabel htmlFor="type">Type</CFormLabel>
              {disableInput ? (
                <Select placeholder="Type" id="tm" key={1} isDisabled={disableInput} />
              ) : (
                <Select
                  onChange={(value) => {
                    formValue.type = value
                    setFormValue(formValue)
                  }}
                  placeholder="Type"
                  id="bank"
                  isRequired={true}
                  isSearchable={false}
                  isClearable={true}
                  defaultValue={formValue.type}
                  options={[
                    { label: 'Debit', value: -1 },
                    { label: 'Credit', value: 1 },
                  ]}
                />
              )}
            </div>
            <div className="col-12 mb-12 col-sm-9">
              <CFormLabel htmlFor="name">Description</CFormLabel>
              <CFormInput
                type="text"
                required
                disabled={disableInput}
                defaultValue={formValue.description}
                onChange={(event) => {
                  formValue.description = event.target.value
                  setFormValue(formValue)
                }}
                placeholder="Description"
                id="name"
                aria-label="lg input description"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mb-12 col-sm-3">
              <CFormLabel htmlFor="name">Amount</CFormLabel>
              {disableInput ? (
                <CFormInput disabled />
              ) : (
                <CurrencyInput
                  decimalsLimit="2"
                  prefix="R$ "
                  disabled={disableInput}
                  decimalSeparator=","
                  allowNegativeValue={false}
                  disableAbbreviations={true}
                  defaultValue={formValue.amount.toString().replace('.', ',')}
                  decimalScale="2"
                  onValueChange={(value) => {
                    formValue.amount = value
                    setFormValue(formValue)
                  }}
                  className="form-control"
                  id="amount"
                />
              )}
            </div>
            <div className="col-12 mb-12 col-sm-4">
              <CFormLabel htmlFor="type">Credit Card</CFormLabel>
              {disableInput ? (
                <Select id="temp2" key={8} placeholder="Credit Card" />
              ) : (
                <AsyncSelect
                  onChange={(selectValue) => {
                    formValue.credit_card_id = selectValue
                    if (selectValue) {
                      setValueDisableDataDue(true)
                    } else {
                      setValueDisableDataDue(false)
                    }
                    setFormValue(formValue)
                  }}
                  defaultValue={formValue.credit_card_id}
                  placeholder="Credit card"
                  id="creditcard"
                  isDisabled={disableInput}
                  isRequired={true}
                  isSearchable={true}
                  isClearable={true}
                  defaultOptions
                  loadOptions={loadOptionsCreditCard}
                />
              )}
            </div>
            <div className="col-12 mb-12 col-sm-3 align-content-center">
              <CFormLabel htmlFor="paidOut">Paid out</CFormLabel>
              <div>
                <CFormCheck
                  button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                  type="radio"
                  onChange={() => {
                    formValue.paidOut = false
                    setFormValue(formValue)
                  }}
                  style={{ borderLeft: 'none' }}
                  name="paidOut"
                  id="paidOut_yes"
                  disabled={disableInput}
                  label="No"
                  defaultChecked={!formValue.paidOut}
                />
                <CFormCheck
                  button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                  type="radio"
                  defaultChecked={formValue.paidOut}
                  onChange={() => {
                    formValue.paidOut = true
                    setFormValue(formValue)
                  }}
                  style={{ borderRadius: 'none' }}
                  name="paidOut"
                  disabled={disableInput}
                  id="paidOut_no"
                  label="Yes"
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: 15 }}>
            <div className="col-12 mb-12 col-sm-4" style={{ marginBottom: '5px' }}>
              <CFormLabel htmlFor="type">Category</CFormLabel>
              {disableInput ? (
                <Select id="temp" key={3} placeholder="Category" />
              ) : (
                <AsyncSelect
                  onChange={(value) => {
                    formValue.category_id = value
                    setFormValue(formValue)
                  }}
                  defaultValue={formValue.category_id}
                  placeholder="Category"
                  id="category"
                  isRequired={true}
                  isSearchable={true}
                  isClearable={true}
                  defaultOptions
                  loadOptions={loadOptionsCategory}
                />
              )}
            </div>
            <div className="col-12 mb-12 col-sm-4">
              <CFormLabel htmlFor="date">Date</CFormLabel>
              {disableInput ? (
                <CFormInput disabled={true} type="date" key={3} />
              ) : (
                <CFormInput
                  type="date"
                  required
                  disabled={disableInput}
                  defaultValue={moment(formValue.date).format('YYYY-MM-DD')}
                  onChange={(event) => {
                    formValue.date = event.target.value
                    setFormValue(formValue)
                  }}
                  placeholder="Date"
                  id="date"
                  aria-label="lg input date"
                />
              )}
            </div>
            <div className="col-12 mb-12 col-sm-4">
              <CFormLabel htmlFor="duedate">Due date</CFormLabel>
              {disableInput ? (
                <CFormInput disabled={true} type="date" key={3} />
              ) : (
                <CFormInput
                  type="date"
                  required
                  defaultValue={moment(formValue.due_date).format('YYYY-MM-DD')}
                  onChange={(event) => {
                    formValue.due_date = event.target.value
                    setFormValue(formValue)
                  }}
                  disabled={dueDateDisabled || disableInput}
                  placeholder="Due date"
                  id="duedate"
                  aria-label="lg input duedate"
                />
              )}
            </div>
          </div>

          <div className="row" style={{ marginTop: 15 }}>
            <div className="col-12 mb-12 col-sm-12">
              <CFormLabel htmlFor="barcode">Obs.</CFormLabel>
              <CFormTextarea
                type="text"
                required
                disabled={disableInput}
                defaultValue={formValue.barcode}
                onChange={(event) => {
                  formValue.barcode = event.target.value
                  setFormValue(formValue)
                }}
                id="barcode"
                aria-label="lg input barcode"
              />
            </div>
          </div>
        </CForm>
        <BootstrapTable
          keyField="id"
          columns={columnsChildBill}
          data={rowsTableBills(childBillList)}
          bordered={false}
          striped={true}
          hover={true}
          wrapperClasses="table-responsive-md"
          bootstrap4
        />
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            onCloseModal()
          }}
        >
          Cancel
        </CButton>
        <CButton
          color="primary"
          onClick={() => {
            if (childBillList.length > 0) {
              setVisibleUpdateChild(true)
            } else {
              formValue.update_childs = false
              setFormValue(formValue)
              updateBill(props.billId, formValue, props.modalVisibleCallback)
            }
          }}
        >
          Save
        </CButton>
        <ConfirmBox
          visible={visibleUpdateChild}
          setVisible={setVisibleUpdateChild}
          message="Want to update all child records?"
          cancelLabel="No"
          okLabel="Yes"
          onCancel={() => {
            formValue.update_childs = false
            setFormValue(formValue)
            updateBill(props.billId, formValue, props.modalVisibleCallback)
          }}
          onOk={() => {
            formValue.update_childs = true
            setFormValue(formValue)
            updateBill(props.billId, formValue, props.modalVisibleCallback)
          }}
        />
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
