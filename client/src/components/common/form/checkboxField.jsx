import React from 'react'
import PropTypes from 'prop-types'

const CheckboxField = ({ type, name, value, onChange, label, error, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.checked })
  }

  return (
    <div className='mb-4'>
      <div className="flex items-center">
        <input type="checkbox" checked={value} onChange={handleChange} {...rest} name={name}
               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

CheckboxField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default CheckboxField