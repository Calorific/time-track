import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'

const MainLayout = () => {

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout