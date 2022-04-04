import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { insertCategory } from '../../../actions/CategoryAction'
import { useHistory } from 'react-router-dom'
const CategoryInsert = () => {
  let history = useHistory()
  const [formValue, setFormValue] = useState({ name: '', is_investiment: false })
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert category</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row">
              <div className="row">
                <div className="col-12 mb-12 col-sm-9" style={{ marginBottom: '5px' }}>
                  <CFormLabel htmlFor="Name">Name</CFormLabel>
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
                    aria-label="lg input description"
                  />
                </div>
                <div className="col-12 mb-12 col-sm-3 align-content-center">
                  <CFormLabel htmlFor="paidOut">Investment</CFormLabel>
                  <div>
                    <CFormCheck
                      button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                      type="radio"
                      onChange={(event) => {
                        formValue.is_investiment = false
                        setFormValue(formValue)
                      }}
                      style={{ borderLeft: 'none' }}
                      name="investment"
                      id="investment_no"
                      label="No"
                      defaultChecked
                    />
                    <CFormCheck
                      button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                      type="radio"
                      onChange={(event) => {
                        formValue.is_investiment = true
                        setFormValue(formValue)
                      }}
                      style={{ borderRadius: 'none' }}
                      name="investment"
                      id="investment_yes"
                      label="Yes"
                    />
                  </div>
                </div>
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CRow>
              <CCol md={2} sm={12} className="mb-2">
                <CButton
                  size={'lg'}
                  className="w-100"
                  color="primary"
                  onClick={() => {
                    insertCategory(formValue, history)
                  }}
                >
                  Save
                </CButton>
              </CCol>
              <CCol md={2} sm={12}>
                <CButton
                  size={'lg'}
                  className="w-100"
                  color="secondary"
                  onClick={() => {
                    history.push('/categories')
                  }}
                >
                  Cancel
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default CategoryInsert
