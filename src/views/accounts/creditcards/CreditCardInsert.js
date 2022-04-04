import PropTypes from 'prop-types'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { insertCreditCard } from '../../../actions/CreditCardAction'

export const CreditCardInsert = (props) => {
  CreditCardInsert.propTypes = {
    accountId: PropTypes.number,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
    actionAfterInsert: PropTypes.func,
  }
  const [formValue, setFormValue] = useState({ name: '', due_day: null, close_day: null })
  const onCloseModal = () => {
    formValue.name = ''
    formValue.close_day = null
    formValue.due_day = null
    setFormValue(formValue)
    props.modalVisibleCallback(false)
    props.actionAfterInsert([])
  }
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      onClosePrevented={onCloseModal}
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>Insert credit card for account #{props.accountId}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <div className="col-12 mb-12 col-sm-12">
              <CFormLabel htmlFor="name">Name</CFormLabel>
              <CFormInput
                type="text"
                required
                defaultValue={formValue.name}
                onChange={(event) => {
                  formValue.name = event.target.value
                  setFormValue(formValue)
                }}
                placeholder="Name"
                id="name"
                aria-label="lg input name"
              />
            </div>
          </CRow>
          <CRow>
            <div className="col-12 mb-12 col-sm-3">
              <CFormLabel htmlFor="due_day">Due day</CFormLabel>
              <CFormInput
                type="text"
                required
                defaultValue={formValue.name}
                onChange={(event) => {
                  formValue.due_day = event.target.value
                  setFormValue(formValue)
                }}
                placeholder="Due day"
                id="due_day"
                aria-label="lg input due_day"
              />
            </div>
            <div className="col-12 mb-12 col-sm-3">
              <CFormLabel htmlFor="close_day">Close day</CFormLabel>
              <CFormInput
                type="text"
                required
                defaultValue={formValue.close_day}
                onChange={(event) => {
                  formValue.close_day = event.target.value
                  setFormValue(formValue)
                }}
                placeholder="Close day"
                id="close_day"
                aria-label="lg input close_day"
              />
            </div>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="info"
          onClick={() => {
            insertCreditCard(props.accountId, formValue, onCloseModal)
          }}
        >
          Save
        </CButton>
        <CButton
          color="danger"
          onClick={() => {
            onCloseModal()
          }}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
