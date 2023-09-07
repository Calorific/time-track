import React from 'react'
import Button from './button'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const GoBackButton = ({ classes, type }) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <Button type={type} text="Назад" bgColor='bg-amber-500 hover:bg-amber-600 dark:bg-teal-500 dark:hover:bg-teal-600'
            classes={classes + ' dark:text-slate-200'} onClick={goBack} />
  )
}

GoBackButton.defaultProps = {
  classes: 'ml-2',
  type: 'button'
}

GoBackButton.propTypes = {
  classes: PropTypes.string,
  type: PropTypes.string,
}

export default GoBackButton