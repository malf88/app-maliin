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
} from '@coreui/react'
import React, { useState } from 'react'
import Select from 'react-select'
import { banks } from '../../utils/assets/Banks'
import PropTypes from 'prop-types'
import { insertAccount } from '../../../actions/AccountAction'
export const AccountInsert = (props) => {
  AccountInsert.propTypes = {
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
  }
  const [formValue, setFormValue] = useState({
    name: '',
    bank: '',
    agency: '',
    account: '',
  })

  const onCloseModal = () => {
    formValue.name = ''
    formValue.bank = ''
    formValue.account = ''
    formValue.agency = ''
    setFormValue(formValue)
    props.modalVisibleCallback(false)
  }
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      onClosePrevented={onCloseModal}
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>Insert account</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row">
          <div className="col-12 mb-12 col-sm-12" style={{ marginBottom: '5px' }}>
            <CFormLabel htmlFor="bank">Account Bank</CFormLabel>
            <Select
              size="sm"
              defaultValue={formValue.bank}
              onChange={(value) => {
                formValue.bank = value
                setFormValue(formValue)
              }}
              placeholder="Bank"
              id="bank"
              isRequired={true}
              options={banks()}
            />
          </div>
          <div className="col-12 mb-12 col-sm-6">
            <CFormLabel htmlFor="name">Account Name</CFormLabel>
            <CFormInput
              type="text"
              size="lg"
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
          <div className="col-12 mb-12 col-sm-6">
            <CFormLabel htmlFor="name">Account Ag.</CFormLabel>
            <CFormInput
              type="text"
              size="lg"
              required
              defaultValue={formValue.agency}
              onChange={(event) => {
                formValue.agency = event.target.value
                setFormValue(formValue)
              }}
              placeholder="Agency"
              id="agency"
              aria-label="lg input agency"
            />
          </div>
          <div className="col-12 mb-12 col-sm-12">
            <CFormLabel htmlFor="name">Account Number</CFormLabel>
            <CFormInput
              type="text"
              required
              size="lg"
              defaultValue={formValue.account}
              onChange={(event) => {
                formValue.account = event.target.value
                setFormValue(formValue)
              }}
              placeholder="Account"
              id="account"
              aria-label="lg input account"
            />
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
            insertAccount(formValue, onCloseModal)
          }}
        >
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
