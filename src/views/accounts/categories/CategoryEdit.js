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
import { updateCategory } from '../../../actions/CategoryAction'
import { useHistory } from 'react-router-dom'
import CategoryService from '../../../services/CategoryService'
import { promiseLoader } from '../../utils/assets/Alerts'
const CategoryEdit = (props) => {
  let history = useHistory()
  const [formValue, setFormValue] = useState({ name: '', is_investiment: null })
  const [disableField, setDisableField] = useState(true)
  // eslint-disable-next-line react/prop-types
  const query = new URLSearchParams(props.location.search)
  const id = query.get('id')
  const loaderCategory = () => {
    if (formValue.name === '') {
      let categoryService = new CategoryService()
      let category = categoryService.getCategory(id).then((response) => {
        formValue.is_investiment = response.data.is_investiment
        formValue.name = response.data.name
        setFormValue(formValue)
        setDisableField(false)
      })
      promiseLoader(category)
    }
  }
  loaderCategory()

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit category</strong>
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
                    disabled={disableField}
                    aria-label="lg input description"
                  />
                </div>
                <div className="col-12 mb-12 col-sm-3 align-content-center">
                  <CFormLabel htmlFor="paidOut">Investment</CFormLabel>
                  <div>
                    <CFormCheck
                      button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                      type="radio"
                      onChange={() => {
                        formValue.is_investiment = false
                        setFormValue(formValue)
                      }}
                      disabled={disableField}
                      style={{ borderLeft: 'none' }}
                      name="investment"
                      id="investment_no"
                      label="No"
                      defaultChecked={!formValue.is_investiment}
                    />
                    <CFormCheck
                      button={{ color: 'success', variant: 'outline', shape: 'rounded-0' }}
                      type="radio"
                      onChange={() => {
                        formValue.is_investiment = true
                        setFormValue(formValue)
                      }}
                      style={{ borderRadius: 'none' }}
                      name="investment"
                      disabled={disableField}
                      id="investment_yes"
                      label="Yes"
                      defaultChecked={formValue.is_investiment}
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
                    updateCategory(id, formValue, history)
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
export default CategoryEdit
