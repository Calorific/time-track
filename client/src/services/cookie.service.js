const accessToken = 'accessToken'
const keepLoggedIn = 'keepLoggedIn'
const theme = 'theme'
const currentRecordTime = 'currentRecordTime'
const isCountdown = 'isCountdown'
const isCounting = 'isCounting'
const startTime = 'startTime'
const countdownInitialTime = 'countdownInitialTime'

class CookieService {
  findCookie(name) {
    const parts = `; ${document.cookie}`.split(`; ${name}=`)
    return parts[1]?.split('; ')[0]
  }

  setCookie(name, value, path = '/') {
    document.cookie = `${name}=${value}; path=${path}`
  }

  getAccessToken() {
    return this.findCookie(accessToken)
  }

  getKeepLoggedIn() {
    return this.findCookie(keepLoggedIn)
  }

  setTheme(value) {
    this.setCookie(theme, value)
  }

  getTheme() {
    return this.findCookie(theme)
  }

  setCurrentRecordTime(time) {
    this.setCookie(currentRecordTime, time)
  }

  getCurrentRecordTime() {
    return this.findCookie(currentRecordTime)
  }

  setIsCountdown(value) {
    this.setCookie(isCountdown, value)
  }

  getIsCountdown() {
    return this.findCookie(isCountdown)
  }

  getIsCounting() {
    return this.findCookie(isCounting)
  }

  setIsCounting(value) {
    this.setCookie(isCounting, value)
  }

  getStartTime() {
    return this.findCookie(startTime)
  }

  setStartTime(time) {
    this.setCookie(startTime, time)
  }

  setCountdownInitialTime(time) {
    this.setCookie(countdownInitialTime, time)
  }

  getCountdownInitialTime() {
    return this.findCookie(countdownInitialTime)
  }

  deleteAllCookies(except = []) {
    const cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i++) {
      const name = cookies[i]?.split('=')?.[0]?.trim()
      if (!except.includes(name) && name)
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
    }
  }
}

const cookieService = new CookieService()

export default cookieService