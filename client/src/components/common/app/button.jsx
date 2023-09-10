import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, type, disabled, bgColor, text, className, children }) => {
  const getButtonClassName = `${bgColor} text-white font-bold py-2 px-4 transition-colors dark:text-gray-200 rounded ${className}`

  return (
    <>
      <button
        className={getButtonClassName}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
        {text}
      </button>
    </>
  )
}

Button.defaultProps = {
  bgColor: 'bg-blue-500 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900',
  className: ''
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  bgColor: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default React.memo(Button)