import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, type, disabled, bgColor, text, classes, children }) => {
  const getButtonClasses = `${bgColor} text-white font-bold py-2 px-4 rounded ${classes}`

  return (
    <>
      <button
        className={getButtonClasses}
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
  bgColor: 'bg-blue-500 hover:bg-blue-700',
  classes: ''
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default React.memo(Button)