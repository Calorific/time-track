import React from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@material-tailwind/react'

const SelectField = ({ name, value, options, onChange, label, className, error }) => {
  const inputClassName = 'text-gray-700 dark:text-gray-200 dark:focus:border-gray-300 !py-0 selectInput'
  const labelClassName = 'dark:border-gray-400 dark:peer-focus:text-gray-300 dark:after:border-gray-400 border-0 ' +
      'dark:text-blue-gray-400 after:border-b-[1px] !dark:focus:after:border-gray-300 !dark:focus:after:border-gray-300' +
      ' !dark:after:border-gray-300'
  const optionClassName = 'dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:text-gray-200 dark:focus:bg-gray-500 ' +
      'dark:bg-gray-700 mb-1 break-words'

  const handleChange = value => {
    onChange({ name, value })
  }

  const parsedValue = typeof value === 'object' ? value.value : value
  return (
    <div className={className}>
      <Select value={parsedValue} onChange={handleChange} variant='standard' label={label} className={inputClassName} containerProps={{ className: '!min-w-[150px] sm:!min-w-[200px]' }}
              labelProps={{ className: labelClassName }} menuProps={{ className: 'dark:bg-gray-800 max-h-72' }} error={!!error}>
        {options.map((option, key) =>
            <Option key={key} value={option.value} className={optionClassName}>{option.label}</Option>)}
      </Select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

SelectField.defaultProps = {
  className: ''
}

SelectField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object,]),
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
}

export default React.memo(SelectField)