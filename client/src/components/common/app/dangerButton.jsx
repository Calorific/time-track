import React from 'react'
import PropTypes from 'prop-types'
import Button from './button'

const DangerButton = ({ children, onClick, className }) => {
  return (
    <Button type='button' onClick={onClick} bgColor='bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700' classes={className}>
      {children}
    </Button>
  )
}

DangerButton.defaultProps = {
  className: ''
}

DangerButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default DangerButton