import React, { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes'
import { useDispatch, useSelector } from 'react-redux'
import { loadCurrentUserData, getCurrentUser } from './store/user'
import cookieService from './services/cookie.service'
import Loader from './components/common/app/loader'
import 'preline'
import authService from './services/auth.service'
import { logOut } from './store/auth'
import withToastErrors from './components/hoc/withToastErrors'
import serverErrors from './serverErrors'
import { useTheme } from './hooks/useTheme'
import { Toaster } from 'react-hot-toast'
import withCookieConsent from './components/hoc/withCookieConsent'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentUserData = useSelector(getCurrentUser())
  const keepLoggedIn = cookieService.getKeepLoggedIn()
  const theme = useTheme()

  const elements = useRoutes(routes(!!keepLoggedIn || currentUserData, location))

  useEffect(() => {
    ;(async () => {
      if (keepLoggedIn && !currentUserData) {
        const data = await dispatch(loadCurrentUserData())
        const errors = data?.errors
        if (errors && errors.message !== serverErrors.networkError)
          dispatch(logOut(navigate))
      }
    })()
  }, [keepLoggedIn, currentUserData, dispatch, navigate])

  useEffect(() => {
    if (!cookieService.getKeepLoggedIn())
      dispatch(logOut(navigate))
  }, [dispatch, navigate])

  useEffect(() => {
    window.onbeforeunload = () => {
      cookieService.deleteAllCookies(['theme'])
      if (!cookieService.getKeepLoggedIn() && cookieService.getAccessToken()) {
        authService.logOut().then()
      }
      return null
    }

    return () => window.onbeforeunload = null
  }, [])


  if (keepLoggedIn && !currentUserData)
    return (
      <div className="w-screen h-screen flex justify-center items-center dark:bg-gray-800">
        <Loader />
      </div>
    )

  return (
    <>
      <Toaster position="top-right" toastOptions={theme === 'dark' ? {
        style: {
          background: '#0f172a',
          color: '#d1d5db',
        }
      } : {}} />
      <div className="App">
        {elements}
      </div>
    </>
  )
}

export default withCookieConsent(withToastErrors(App))
