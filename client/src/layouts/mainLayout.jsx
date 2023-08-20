import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {

  return (
    <>
      <h1>App</h1>
      <Outlet />
    </>
  )
}

export default MainLayout