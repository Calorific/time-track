import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/user'

const AuthLayout = () => {
  const navigate = useNavigate()
  const currentUserData = useSelector(getCurrentUser())

  useEffect(() => {
    if (currentUserData)
      navigate('/')
  }, [currentUserData, navigate])

  return (
    <div className='flex justify-center items-center min-h-screen dark:bg-gray-800 py-4'>
      <Outlet />
    </div>
  )
}

export default AuthLayout