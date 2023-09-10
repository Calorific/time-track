import React from 'react'
import PropTypes from 'prop-types'
import Button from './button'

const SuccessButton = ({ children, onClick, className }) => {
  return (
    <Button bgColor="bg-green-500 dark:bg-green-600 hover:bg-green-700 dark:hover:bg-green-700" className={className} onClick={onClick}>
      {children}
    </Button>
  )
}

SuccessButton.defaultProps = {
  className: ''
}

SuccessButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default SuccessButton