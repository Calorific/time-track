import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, type, disabled, bgColor, text }) => {
  // const getButtonClasses = bgColor + '-500 text-white font-bold py-2 px-4 rounded'
  //   + (disabled ? '' : ` hover:${bgColor}-700`)

  const getButtonClasses = `${bgColor} text-white font-bold py-2 px-4 rounded`


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
  bgColor: 'bg-blue-500 hover:bg-blue-700'
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  text: PropTypes.string,
}

export default React.memo(Button)