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
import React, { useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import CategoryService from '../../../services/CategoryService'
import AsyncSelect from 'react-select/async'
import CreditCardService from '../../../services/CreditCardService'
import moment from 'moment'
import CurrencyInput from 'react-currency-input-field'
export const BillInsert = (props) => {
  BillInsert.propTypes = {
    accountId: PropTypes.number,
    insertCallback: PropTypes.func,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
  }
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
    portion: '',
  })
  const setFormValueDefault = (formValue) => {
    setFormValue(formValue)
  }
  const setValueDisableDataDue = (dataValue) => {
    setDueDateDisabled(dataValue)
  }

  const onCloseModal = () => {
    formValue.type = ''
    formValue.description = ''
    formValue.amount = '0,00'
    formValue.paidOut = false
    formValue.date = moment().format('YYYY-MM-DD')
    formValue.due_date = ''
    formValue.credit_card_id = null
    formValue.category_id = null
    formValue.barcode = ''
    formValue.portion = ''
    setDueDateDisabled(false)
    setFormValueDefault(formValue)
    props.modalVisibleCallback(false)
  }
  let categoryService = new CategoryService()
  let creditcardService = new CreditCardService()
  const loadOptionsCategory = (inputValue, callback) => {
    categoryService.getCategories().then((response) => {
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
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      backdrop="static"
      onClosePrevented={onCloseModal}
      size="lg"
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>Insert new bill to #{props.accountId}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row">
          <div className="row">
            <div className="col-12 mb-12 col-sm-3" style={{ marginBottom: '5px' }}>
              <CFormLabel htmlFor="type">Type</CFormLabel>
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
                options={[
                  { label: 'Debit', value: -1 },
                  { label: 'Credit', value: 1 },
                ]}
              />
            </div>
            <div className="col-12 mb-12 col-sm-9">
              <CFormLabel htmlFor="name">Description</CFormLabel>
              <CFormInput
                type="text"
                required
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
              <CurrencyInput
                decimalsLimit="2"
                prefix="R$ "
                decimalSeparator=","
                allowNegativeValue={false}
                disableAbbreviations={true}
                defaultValue="0.00"
                decimalScale="2"
                onValueChange={(value) => {
                  formValue.amount = value
                  setFormValue(formValue)
                }}
                className="form-control"
                id="amount"
              />
            </div>
            <div className="col-12 mb-12 col-sm-2">
              <CFormLabel htmlFor="portion">Portion</CFormLabel>
              <CFormInput
                type="number"
                required
                defaultValue="1"
                onChange={(event) => {
                  formValue.portion = event.target.value
                  setFormValue(formValue)
                }}
                placeholder="Portion"
                id="portion"
                aria-label="lg input portion"
              />
            </div>
            <div className="col-12 mb-12 col-sm-4">
              <CFormLabel htmlFor="type">Credit Card</CFormLabel>
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
                placeholder="Credit card"
                id="creditcard"
                isRequired={true}
                isSearchable={true}
                isClearable={true}
                defaultOptions
                loadOptions={loadOptionsCreditCard}
              />
            </div>
            <div className="col-12 mb-12 col-sm-3 align-content-center">
              <CFormLabel htmlFor="paidOut">Paid out</CFormLabel>
              <div>
                <CFormCheck
                  button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                  type="radio"
                  onChange={(event) => {
                    formValue.paidOut = false
                    setFormValue(formValue)
                  }}
                  style={{ borderLeft: 'none' }}
                  name="paidOut"
                  id="paidOut_yes"
                  label="No"
                  defaultChecked
                />
                <CFormCheck
                  button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                  type="radio"
                  onChange={(event) => {
                    formValue.paidOut = true
                    setFormValue(formValue)
                  }}
                  style={{ borderRadius: 'none' }}
                  name="paidOut"
                  id="paidOut_no"
                  label="Yes"
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: 15 }}>
            <div className="col-12 mb-12 col-sm-4" style={{ marginBottom: '5px' }}>
              <CFormLabel htmlFor="type">Category</CFormLabel>
              <AsyncSelect
                onChange={(value) => {
                  formValue.category_id = value
                  setFormValue(formValue)
                }}
                placeholder="Category"
                id="category"
                isRequired={true}
                isSearchable={true}
                isClearable={true}
                defaultOptions
                loadOptions={loadOptionsCategory}
              />
            </div>
            <div className="col-12 mb-12 col-sm-4">
              <CFormLabel htmlFor="date">Date</CFormLabel>
              <CFormInput
                type="date"
                required
                defaultValue={moment().format('YYYY-MM-DD')}
                onChange={(event) => {
                  formValue.date = event.target.value
                  setFormValue(formValue)
                }}
                placeholder="Date"
                id="date"
                aria-label="lg input date"
              />
            </div>
            <div className="col-12 mb-12 col-sm-4">
              <CFormLabel htmlFor="duedate">Due date</CFormLabel>
              <CFormInput
                type="date"
                required
                onChange={(event) => {
                  formValue.due_date = event.target.value
                  setFormValue(formValue)
                }}
                disabled={dueDateDisabled}
                placeholder="Due date"
                id="duedate"
                aria-label="lg input duedate"
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: 15 }}>
            <div className="col-12 mb-12 col-sm-12">
              <CFormLabel htmlFor="barcode">Obs.</CFormLabel>
              <CFormTextarea
                type="text"
                required
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
            props.insertCallback(props.accountId, formValue, onCloseModal)
          }}
        >
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
