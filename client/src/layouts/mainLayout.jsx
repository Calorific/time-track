import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'

const MainLayout = () => {

  return (
    <div className='min-h-screen flex flex-col dark:bg-gray-800'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout