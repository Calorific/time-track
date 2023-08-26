import React from 'react'
import AuthLayout from './layouts/authLayout'
import RegisterPage from './pages/registerPage'
import { Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import MainLayout from './layouts/mainLayout'
import MainPage from './pages/mainPage'

const routes = (isLoggedIn, location) => [
  {
    path: '',
    element: (isLoggedIn ? <MainLayout /> : <Navigate to='/auth/login' state={{ referer: location }} />),
    children: [
      {
        path: '/',
        element: <MainPage />
      }
    ]
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