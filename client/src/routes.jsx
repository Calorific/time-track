import React from 'react'
import AuthLayout from './layouts/authLayout'
import RegisterPage from './pages/registerPage'
import { Navigate } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import MainLayout from './layouts/mainLayout'
import MainPage from './pages/mainPage'
import ProjectListPage from './pages/projectListPage'
import ProjectForm from './pages/projectForm'
import ProjectDetailsPage from './pages/projectDetailsPage'
import ProfilePage from './pages/profilePage'
import StatisticsPage from './pages/statisticsPage'

const routes = (isLoggedIn, location) => [
  {
    path: '',
    element: (isLoggedIn ? <MainLayout /> : <Navigate to='auth/login' state={{ referer: location }} />),
    children: [
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'statistics',
        element: <StatisticsPage />
      },
      {
        path: 'projects/:id/details',
        element: <ProjectDetailsPage />
      },
      {
        path: 'projects/:id/edit',
        element: <ProjectForm />
      },
      {
        path: 'projects/create',
        element: <ProjectForm />
      },
      {
        path: 'projects/:page?',
        element: <ProjectListPage />
      },
      {
        path: '',
        element: <MainPage />
      },
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
    element: <Navigate to={isLoggedIn ? '/' : 'auth/login'} />
  }
]

export default routes