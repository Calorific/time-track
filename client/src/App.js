import React, { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loadCurrentUserData, getCurrentUser } from './store/user'
import cookieService from './services/cookie.service'
import Loader from './components/common/app/loader'
import 'preline'
import authService from './services/auth.service'
import { parseServerErrors } from './utils/parseServerErrors'
import { logOut } from './store/auth'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const keepLoggedIn = cookieService.getKeepLoggedIn()
  const currentUserData = useSelector(getCurrentUser())


  useEffect(() => {
    ;(async () => {
      if (keepLoggedIn && !currentUserData) {
        const data = await dispatch(loadCurrentUserData())
        const errors = data?.errors
        if (errors) {
          toast.error(parseServerErrors(errors.message))
          dispatch(logOut(navigate))
        }
      }
    })()
  }, [keepLoggedIn, currentUserData, dispatch, navigate])


  const elements = useRoutes(routes(!!keepLoggedIn || currentUserData, location))

  window.addEventListener('beforeunload', () => {
    if (!cookieService.getKeepLoggedIn() && cookieService.getAccessToken())
      authService.logOut().then()
    return null
  })

  if (keepLoggedIn && !currentUserData)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    )

  return (
    <div className="App">
      {elements}
    </div>
  )
}

export default App
