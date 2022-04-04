import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2021 Mallin.net</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span> Maliin
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
