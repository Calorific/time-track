import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@material-tailwind/react'

const TextField = ({ type, name, value, onChange, label, placeholder, error, onKeyDown, classes, ...rest  }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = 'text-gray-900 dark:text-gray-300'

  return (
    <div className={classes}>
      <Input label={label || ''} id={name} type={type} name={name} value={value} onChange={handleChange} onKeyDown={onKeyDown}
             error={error} className={getInputClasses} containerProps={{ className: '!min-w-0' }} {...rest} />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
  classes: 'mb-4'
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
  classes: PropTypes.string,
}

export default React.memo(TextField)
