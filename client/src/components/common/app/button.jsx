import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, type, disabled, bgColor, text, classes }) => {
  const getButtonClasses = `${bgColor} text-white font-bold py-2 px-4 rounded ${classes}`

  return (
    <>
      <button
        className={getButtonClasses}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
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
}

export default React.memo(Button)