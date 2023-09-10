import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({ text, color, className }) => {
  const classNames = `inline-flex items-center text-center whitespace-pre break-keep gap-1.5 py-1.5 px-3 mx-2 
    rounded-full text-xs font-medium ${color} ${className} `

  return (
    <span className={classNames}>
      {text}
    </span>
  )
}

Badge.defaultProps = {
  color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  className: ''
}

Badge.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
}

export default Badge