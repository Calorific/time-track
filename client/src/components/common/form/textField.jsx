import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({ type, name, value, onChange, label, placeholder, error, onKeyDown, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getLabelClasses = 'block mb-2 text-sm font-medium dark:text-white '
      + (error ? 'text-red-600' : 'text-gray-900')


  const getInputClasses = `bg-gray-50 border border-gray-300text-sm rounded-sm focus:ring-blue-500
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${error
      ? 'text-red-900 placeholder-red-600 border border-red-500 rounded outline-none focus:ring-red-500 focus:border-red-500'
      : 'text-gray-900'
  }`

  return (
    <div className='mb-4'>
      <label htmlFor={name} className={getLabelClasses}>
        {label}
      </label>
      <input id={name} type={type} name={name} value={value} onChange={handleChange} className={getInputClasses}
         placeholder={placeholder} onKeyDown={onKeyDown} {...rest} />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onKeyDown: PropTypes.func,
}

export default React.memo(TextField)
