import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/ui/navbar'

const MainLayout = () => {

  return (
    <>
      <Navbar />
      <h1>App</h1>
      <NavLink to={'auth/register'}>Регистрация</NavLink>
      <Outlet />
    </>
  )
}

export default MainLayout