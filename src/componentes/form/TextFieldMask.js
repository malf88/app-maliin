import * as React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

const TextFieldMask = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator={'.'}
      allowNegative={false}
      decimalSeparator={','}
      allowLeadingZeros={true}
      decimalScale={2}
      fixedDecimalScale={true}
      isNumericString
      prefix="R$ "
    />
  )
})

TextFieldMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextFieldMask
