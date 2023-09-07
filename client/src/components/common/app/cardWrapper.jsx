import React from 'react'
import PropTypes from 'prop-types'

const CardWrapper = ({ children, externalClasses }) => {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800
      dark:border-gray-700 mx-2 ${externalClasses || ''}`}>
      {children}
    </div>
  )
}

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  externalClasses: PropTypes.string,
}

export default CardWrapper