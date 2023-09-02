import React from 'react'
import PropTypes from 'prop-types'
import CardWrapper from './cardWrapper'

const FormWrapper = ({ children, externalClasses }) => {
  return (
    <div className={`max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800
      dark:border-gray-700 min-w-[450px] ${externalClasses || ''}`}>
      {children}
    </div>
  )
}

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  externalClasses: PropTypes.string,
}

export default FormWrapper