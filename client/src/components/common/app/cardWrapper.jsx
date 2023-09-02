import React from 'react'
import PropTypes from 'prop-types'

const CardWrapper = ({ children, externalClasses }) => {

  return (
      <div className={`flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700
      dark:shadow-slate-700/[.7] justify-center ${externalClasses || ''}`}>
        {children}
      </div>
  )
}

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  externalClasses: PropTypes.string,
}

export default CardWrapper