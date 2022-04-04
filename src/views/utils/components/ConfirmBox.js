import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

export const ConfirmBox = (props) => {
  ConfirmBox.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    message: PropTypes.string,
  }
  return (
    <CModal visible={props.visible} onClose={() => props.setVisible(false)}>
      <CModalHeader className="bg-light" onClose={() => props.setVisible(false)}>
        <CModalTitle>
          <CIcon style={{ color: '#ff9900' }} size="xl" icon={icon.cilWarning} /> Confirmation
        </CModalTitle>
      </CModalHeader>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <CModalBody>{props.message}</CModalBody>
      <CModalFooter>
        <CButton
          color="success"
          onClick={() => {
            props.onCancel()
            props.setVisible(false)
          }}
        >
          {props.cancelLabel}
        </CButton>
        <CButton
          color="danger"
          onClick={() => {
            props.onOk()
            props.setVisible(false)
          }}
        >
          {props.okLabel}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
