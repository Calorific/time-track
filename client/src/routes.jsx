import React from 'react'
import AuthLayout from './layouts/authLayout'
import RegisterPage from './pages/registerPage'
import { Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import MainLayout from './layouts/mainLayout'
import MainPage from './pages/mainPage'
import ProjectListPage from './pages/projectListPage'
import CreateProject from './pages/createProject'

const routes = (isLoggedIn, location) => [
  {
    path: '',
    element: (isLoggedIn ? <MainLayout /> : <Navigate to='auth/login' state={{ referer: location }} />),
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: 'projects/:id/details',
        element: <p>Details</p>
      },
      {
        path: 'projects/:id/edit',
        element: <CreateProject />
      },
      {
        path: 'projects/create',
        element: <CreateProject />
      },
      {
        path: 'projects/:page?',
        element: <ProjectListPage />
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
  {
    path: '*',
    element: <Navigate to={isLoggedIn ? '/' : 'auth/login'} state={{ referer: location }} />
  }
]

export default routes