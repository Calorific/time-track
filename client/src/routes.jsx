import React from 'react'
import AuthLayout from './layouts/authLayout'
import RegisterPage from './components/pages/registerPage'
import { Navigate } from 'react-router-dom'
import LoginPage from './components/pages/loginPage'
import MainLayout from './layouts/mainLayout'

const routes = (isLoggedIn, location) => [
  {
    path: '',
    element: <MainLayout />
  },
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