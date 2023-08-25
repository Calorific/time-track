import React from 'react'
import AuthLayout from './layouts/authLayout'
import RegisterPage from './components/pages/registerPage'
import { Navigate } from 'react-router-dom'
import LoginPage from './components/pages/loginPage'
import MainLayout from './layouts/mainLayout'

const routes = (isLoggedIn, location) => [
  {
    path: '',
    element: (isLoggedIn ? <MainLayout /> : <Navigate to='/auth/login' state={{ referer: location }} />)
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='login' replace />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: '*',
        element: <Navigate to='login' replace />
      },
    ]
  },
]

export default routes