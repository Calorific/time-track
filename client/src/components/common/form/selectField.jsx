import React from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@material-tailwind/react'

const SelectField = ({ name, value, options, onChange, label, classes }) => {
  const inputClasses = 'text-gray-700 dark:text-gray-200 dark:focus:border-gray-300 !py-0'
  const labelClasses = 'dark:border-gray-400 dark:peer-focus:text-gray-300 dark:after:border-gray-400 border-0 ' +
      'dark:text-blue-gray-400 after:border-b-[1px] !dark:focus:after:border-gray-300 !dark:focus:after:border-gray-300' +
      ' !dark:after:border-gray-300'
  const optionClasses = 'dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:text-gray-200 dark:focus:bg-gray-500 ' +
      'dark:bg-gray-700 mb-1'

  const handleChange = value => {
    onChange({ name, value })
  }

  const parsedValue = typeof value === 'object' ? value.value : value
  return (
    <div className={'select min-w-[150px] sm:min-w-[200px] ' + (classes || '')}>
      <Select value={parsedValue} onChange={handleChange} variant='standard' label={label} className={inputClasses} labelProps={{ className: labelClasses }} menuProps={{ className: 'dark:bg-gray-800' }} >
        {options.map((option, key) =>
            <Option key={key} value={option.value} className={optionClasses}>{option.label}</Option>)}
      </Select>
    </div>
  )
}

SelectField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object,]),
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  classes: PropTypes.string,
}

export default React.memo(SelectField)