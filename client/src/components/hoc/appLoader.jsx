import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getAuthLoading, getCurrentUserId } from '../../store/auth'

const AppLoader = ({ children }) => {
  const loading = useSelector(getAuthLoading())
  const currentUser = useSelector(getCurrentUser())

  return (
    <>

    </>
  )
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader