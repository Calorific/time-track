import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const TextField = ({ type, name, value, onChange, label, placeholder, error, onKeyDown, classes, ...rest  }) => {
  const [show, setShow] = useState(false)

  const togglePassword = () => {
    setShow(prevState => !prevState)
  }

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const inputClasses = 'text-gray-700 dark:text-gray-200 !py-0'
  const labelClasses = 'dark:border-gray-400 dark:peer-focus:text-gray-300 dark:after:border-gray-400 border-0 ' +
      'dark:text-blue-gray-400 after:border-b-[1px] dark:peer-focus:after:border-gray-300'

  const icon = type === 'password'
      ? <FontAwesomeIcon icon={show ? faEyeSlash : faEye} className='cursor-pointer' onClick={togglePassword} />
      : null

  return (
    <div className={classes}>
      <Input label={label || ''} id={name} type={show ? 'text' : type} name={name} value={value} onChange={handleChange}
             onKeyDown={onKeyDown} error={!!error} className={inputClasses} labelProps={{ className: labelClasses }} icon={icon}
             containerProps={{ className: '!min-w-0' }} variant='standard' autoComplete="one-time-code" {...rest} />
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
