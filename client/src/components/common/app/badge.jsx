import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({ text, color, externalClasses }) => {
  const classes = `inline-flex items-center gap-1.5 py-1.5 px-3 mx-2 rounded-full text-xs font-medium ${color} ${externalClasses} `

  return (
    <span className={classes}>
      {text}
    </span>
  )
}

Badge.defaultProps = {
  color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
}

Badge.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.string,
}

export default Badge