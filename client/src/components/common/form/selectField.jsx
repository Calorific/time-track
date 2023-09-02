import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-tailwindcss-select'

const SelectField = ({ name, value, options, placeholder, onChange, label, error, classes, ...rest }) => {

  const handleChange = data => {
    onChange({ name, ...data })
  }

  const parsedValue = typeof value === 'object' || !value
    ? value
    : { value, label: options.find(option => option.value === value).label }

  return (
    <div className={'select min-w-[150px] sm:min-w-[200px] ' + (classes || '')}>
      <Select options={options} value={parsedValue} onChange={handleChange} placeholder={placeholder} {...rest} />
    </div>
  )
}

SelectField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  classes: PropTypes.string,
}

export default React.memo(SelectField)