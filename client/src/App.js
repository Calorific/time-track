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

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentUserData = useSelector(getCurrentUser())
  const keepLoggedIn = cookieService.getKeepLoggedIn()
  const theme = cookieService.getTheme() || 'light'

  useEffect(() => {
    ;(async () => {
      document.body.classList[theme === 'dark' ? 'add' : 'remove']('dark')
      if (keepLoggedIn && !currentUserData) {
        const data = await dispatch(loadCurrentUserData())
        const errors = data?.errors
        if (errors && errors.message !== serverErrors.networkError)
          dispatch(logOut(navigate))
      }
    })()
  }, [keepLoggedIn, currentUserData, dispatch, navigate, theme])

  const elements = useRoutes(routes(!!keepLoggedIn || currentUserData, location))

  window.addEventListener('beforeunload', () => {
    if (!cookieService.getKeepLoggedIn() && cookieService.getAccessToken()) {
      cookieService.deleteAllCookies()
      authService.logOut().then()
    }
    return null
  })

  if (keepLoggedIn && !currentUserData)
    return (
      <div className="w-screen h-screen flex justify-center items-center dark:bg-gray-800">
        <Loader />
      </div>
    )

  return (
    <div className="App">
      {elements}
    </div>
  )
}

export default withToastErrors(App)
