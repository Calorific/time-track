import React from 'react'
import PropTypes from 'prop-types'
import { Textarea } from '@material-tailwind/react'

const TextAreaField = ({ name, value, onChange, label, placeholder, error, onKeyDown, classes, ...rest  }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const inputClasses = 'text-gray-700 dark:text-gray-200 dark:focus:border-gray-300 !pb-0 pt-1'
  const labelClasses = 'dark:border-gray-400 dark:peer-focus:text-gray-300 dark:after:border-gray-400 border-0 ' +
      'dark:text-blue-gray-400 after:border-b-[1px] !dark:focus:after:border-gray-300 !dark:focus:after:border-gray-300 !dark:after:border-gray-300'

  return (
      <div className={classes}>
        <Textarea label={label} id={name} name={name} value={value} onChange={handleChange} onKeyDown={onKeyDown}
                  error={!!error} className={inputClasses} labelProps={{ className: labelClasses }}
                  containerProps={{ className: 'border-0' }} variant='standard' autoComplete="one-time-code"  {...rest} />
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
  )
}

TextAreaField.defaultProps = {
  classes: 'mb-4'
}

TextAreaField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onKeyDown: PropTypes.func,
  classes: PropTypes.string,
}

export default React.memo(TextAreaField)
