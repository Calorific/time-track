import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@material-tailwind/react'

const CheckboxField = ({ name, value, onChange, label, error, ...rest }) => {
  const classes = 'before:hidden'
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.checked })
  }

  return (
    <div className='-mt-2 mb-1 -ml-2'>
      <div className="flex items-center">
        <Checkbox name={name} id={name} checked={value} onChange={handleChange} className={classes} {...rest} />
        <label htmlFor={name} className="ml-0.5 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
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
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default React.memo(CheckboxField)