import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { login } from '../../../services/AuthService'
import Logo from '../../../assets/images/logo.png'

const Login = () => {
  let history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1 align="center" className="p-3 rounded-3">
                      <CImage src={Logo} />{' '}
                    </h1>
                    <p className="text-medium-emphasis text-center">Sign In to your account</p>
                    <CInputGroup className="mb-12 mb-3">
                      <CInputGroupText className="bg-white">
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-mail"
                        autoComplete="email"
                        size={'lg'}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-12 mb-3">
                      <CInputGroupText className="bg-white">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        size={'lg'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="text-center">
                        <CButton
                          color="warning"
                          size={'lg'}
                          className="m-auto"
                          onClick={(event) => {
                            event.preventDefault()
                            login(email, password, history)
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
