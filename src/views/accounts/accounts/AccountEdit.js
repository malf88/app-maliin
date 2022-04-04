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
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { banks, findBank } from '../../utils/assets/Banks'
import AccountService from '../../../services/AccountService'
import { promiseLoader } from '../../utils/assets/Alerts'
import PropTypes from 'prop-types'
export const AccountEdit = (props) => {
  AccountEdit.propTypes = {
    accountId: PropTypes.number,
    editCallback: PropTypes.func,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
  }
  const [formValue, setFormValue] = useState({
    name: '',
    bank: '',
    agency: '',
    account: '',
  })
  const [disableInput, setDisableInput] = useState(true)
  const setFormValueDefault = (values) => {
    setFormValue(values)
  }
  useEffect(() => {
    if (props.accountId != null && props.modalVisibleState === true) {
      let accountService = new AccountService()
      let account = accountService.getAccount(props.accountId).then((response) => {
        formValue.name = response.data.name
        formValue.bank = findBank(response.data.bank)[0]
        formValue.account = response.data.account
        formValue.agency = response.data.agency
        setFormValueDefault(formValue)
        setDisableInput(false)
      })
      promiseLoader(account)
    }
  }, [formValue, props.accountId, props.modalVisibleState])
  const onCloseModal = () => {
    formValue.name = ''
    formValue.bank = ''
    formValue.account = ''
    formValue.agency = ''
    setFormValueDefault(formValue)
    setDisableInput(true)
    props.accountIdCallback(null)
    props.modalVisibleCallback(false)
  }
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      onClosePrevented={onCloseModal}
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>Edit account #{props.accountId}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row">
          <div className="col-12 mb-12 col-sm-12" style={{ marginBottom: '5px' }}>
            <CFormLabel htmlFor="bank">Account Bank</CFormLabel>
            {formValue.bank !== '' ? (
              <Select
                size="sm"
                defaultValue={formValue.bank}
                onChange={(value) => {
                  formValue.bank = value
                  setFormValue(formValue)
                }}
                isDisabled={disableInput}
                placeholder="Bank"
                id="bank"
                isRequired={true}
                options={banks()}
              />
            ) : (
              <Select size="sm" id="temp" key={1} isDisabled={true} />
            )}
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
              disabled={disableInput}
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
              disabled={disableInput}
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
              disabled={disableInput}
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
            props.editCallback(props.accountId, formValue, onCloseModal)
          }}
        >
          Save
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
