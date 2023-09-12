import React, { useEffect } from 'react'
import cookieService from '../../services/cookie.service'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookie } from '@fortawesome/free-solid-svg-icons'

const withCookieConsent = Component => props => {

  const giveConsent = t => {
    cookieService.setCookieConsent(true)
    toast.dismiss(t.id)
  }

  useEffect(() => {
    if (cookieService.getCookieConsent() !== 'true') {
      toast(t => (
        <span>
          <FontAwesomeIcon icon={faCookie} /> Этот сайт использует cookie {' '}
          <button className='text-blue-500' onClick={giveConsent}>Принять</button>
        </span>
      ), {
        duration: Infinity,
        id: 'cookieConsent'
      })
    }
  }, [])

  return <Component {...props} />
}

export default withCookieConsent