import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { Autocomplete, Select, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { listPeriods } from './BillActions'

const SelectPeriod = (props) => {
  SelectPeriod.propTypes = {
    value: PropTypes.any,
    accountid: PropTypes.number,
  }
  const [options, setOptions] = useState([{ value: '', label: '' }])
  useEffect(() => {
    loadOptions()
  }, [options])

  const loadOptions = async () => {
    let optionsList = []
    await listPeriods(props.accountid).then((response) => {
      response.data.forEach((item) => {
        optionsList.push({
          label: item.month + '/' + item.year,
          value: item.year + '-' + item.month,
        })
      })
    })
    setOptions(optionsList)
  }
  const listItemInOptions = () => {
    let listOption = []
    listOption.push(
      <MenuItem key={'Outros'} value={0}>
        Outros
      </MenuItem>,
    )
    options.forEach((item) => {
      listOption.push(
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>,
      )
    })

    return listOption
  }
  return (
    <Select
      {...props}
      variant="standard"
      size="medium"
      label="Outros"
      disableUnderline
      isOptionEqualToValue={(option, value) => option.value === value.value}
    >
      {listItemInOptions()}
    </Select>
  )
}

export default SelectPeriod
