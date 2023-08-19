import React from 'react'
import AuthLayout from './components/layouts/authLayout'
import RegisterPage from './components/pages/registerPage'
import { Navigate } from 'react-router-dom'
import LoginPage from './components/pages/loginPage'

const routes = (isLoggedIn, location) => [
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='login' />
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
        element: <Navigate to='login' />
      },
    ]
  },
]

export default routes