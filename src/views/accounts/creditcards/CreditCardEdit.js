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
import React, { useEffect, useState } from 'react'
import { updateCreditCard } from '../../../actions/CreditCardAction'
import CreditCardService from '../../../services/CreditCardService'
import { promiseLoader } from '../../utils/assets/Alerts'

export const CreditCardEdit = (props) => {
  CreditCardEdit.propTypes = {
    accountId: PropTypes.number,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
    actionAfterUpdate: PropTypes.func,
    creditCardId: PropTypes.number,
    creditCardIdCallback: PropTypes.func,
  }

  const [formValue, setFormValue] = useState({ name: '', due_day: null, close_day: null })
  const [disableField, setDisableField] = useState(true)
  useEffect(() => {
    if (props.creditCardId != null && props.modalVisibleState) {
      let creditCardService = new CreditCardService()
      let promiseCreditCard = creditCardService
        .getCreditCard(props.creditCardId)
        .then((response) => {
          formValue.name = response.data.name
          formValue.close_day = response.data.close_day
          formValue.due_day = response.data.due_day
          setFormValue(formValue)
          setDisableField(false)
        })
      promiseLoader(promiseCreditCard)
    }
  }, [formValue, props.creditCardId, props.modalVisibleState])

  const onCloseModal = () => {
    formValue.name = ''
    formValue.close_day = null
    formValue.due_day = null
    setFormValue(formValue)
    props.modalVisibleCallback(false)
    props.actionAfterUpdate([])
    setDisableField(true)
    props.creditCardIdCallback(null)
  }
  return (
    <CModal
      visible={props.modalVisibleState}
      onClose={onCloseModal}
      onClosePrevented={onCloseModal}
    >
      <CModalHeader onClose={onCloseModal}>
        <CModalTitle>Edit credit card #{props.creditCardId}</CModalTitle>
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
                disabled={disableField}
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
                defaultValue={formValue.due_day}
                onChange={(event) => {
                  formValue.due_day = event.target.value
                  setFormValue(formValue)
                }}
                disabled={disableField}
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
                disabled={disableField}
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
            updateCreditCard(props.creditCardId, formValue, onCloseModal)
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
