import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {

  return (
    <div className='authLayout'>
      <div className='container mx-auto flex justify-center items-center h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout