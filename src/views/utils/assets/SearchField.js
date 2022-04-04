import React from 'react'
import PropTypes from 'prop-types'
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
const SearchField = (props) => {
  SearchField.propTypes = {
    onSearch: PropTypes.func,
  }
  let input
  const handleClick = () => {
    props.onSearch(input.value)
  }
  return (
    <div>
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon={icon.cilSearch} />
        </CInputGroupText>
        <CFormInput
          placeholder="Search"
          className="form-control"
          ref={(n) => (input = n)}
          type="text"
          onChange={handleClick}
        />
      </CInputGroup>
    </div>
  )
}
export default SearchField
