import React from 'react'
import PropTypes from 'prop-types'
import { Textarea } from '@material-tailwind/react'

const TextAreaField = ({ name, value, onChange, label, placeholder, error, onKeyDown, classes, ...rest  }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const getInputClasses = 'text-gray-900 dark:text-gray-300'

  return (
      <div className={classes}>
        <Textarea label={label} id={name} name={name} value={value} onChange={handleChange} onKeyDown={onKeyDown} className={getInputClasses} {...rest} />
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
