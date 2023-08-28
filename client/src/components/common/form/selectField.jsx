import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-tailwindcss-select'

const SelectField = ({ name, value, options, placeholder, onChange, label, error, ...rest }) => {

  const handleChange = data => {
    onChange({ name, ...data })
  }

  return (
    <div className='min-w-[150px] sm:min-w-[200px]'>
      <Select options={options} value={value} onChange={handleChange} placeholder='Выберите текущий проект' {...rest} />
    </div>
  )
}

SelectField.propTypes = {
  value: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default SelectField