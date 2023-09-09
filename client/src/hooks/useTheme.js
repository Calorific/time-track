import { useEffect, useState } from 'react'
import cookieService from '../services/cookie.service'
import { useSelector } from 'react-redux'
import { getUserTheme } from '../store/user'

const toggleThemeClass = theme => {
  if (theme === 'dark')
    document.body.classList.add('dark')
  else
    document.body.classList.remove('dark')
}

export const useTheme = () => {
  const initialTheme = cookieService.getTheme() || 'light'
  const [theme, setTheme] = useState(initialTheme)
  const userTheme = useSelector(getUserTheme())

  useEffect(() => {
    if (userTheme) {
      setTheme(userTheme)
      cookieService.setTheme(userTheme)
    }

    toggleThemeClass(userTheme || initialTheme)
  }, [userTheme, initialTheme])

  return theme
}