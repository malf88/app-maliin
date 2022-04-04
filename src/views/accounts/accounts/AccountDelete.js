import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

export const AccountDelete = (props) => {
  AccountDelete.propTypes = {
    accountId: PropTypes.number,
    deleteCallback: PropTypes.func,
    modalVisibleCallback: PropTypes.func,
    modalVisibleState: PropTypes.bool,
    accountIdCallback: PropTypes.func,
  }
  return (
    <CModal visible={props.modalVisibleState} onClose={() => props.modalVisibleCallback(false)}>
      <CModalHeader onClose={() => props.modalVisibleCallback(false)}>
        <CModalTitle>Confirmation</CModalTitle>
      </CModalHeader>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <CModalBody>Do you really want to remove the registry?</CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            props.modalVisibleCallback(false)
          }}
        >
          No
        </CButton>
        <CButton
          color="primary"
          onClick={() => {
            props.deleteCallback(props.accountId)
            props.modalVisibleCallback(false)
          }}
        >
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
