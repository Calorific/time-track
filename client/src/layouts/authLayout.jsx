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
    <div className='w-screen h-screen'>
      <div className='container mx-auto flex justify-center items-center h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout