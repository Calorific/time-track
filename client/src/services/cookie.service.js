const accessTokenName = 'accessToken'
const keepLoggedInName = 'keepLoggedIn'
const currentRecordTimeName = 'currentRecordTime'
const isCountdownName = 'isCountdown'
const isCountingName = 'isCounting'
const startTimeName = 'startTime'
const countdownInitialTimeName = 'countdownInitialTime'

class CookieService {

  findCookie(name) {
    const parts = `; ${document.cookie}`.split(`; ${name}=`)
    return parts[1]?.split('; ')[0]
  }

  getAccessToken() {
    return this.findCookie(accessTokenName)
  }

  getKeepLoggedIn() {
    return this.findCookie(keepLoggedInName)
  }

  setCurrentRecordTime(time) {
    document.cookie = `${currentRecordTimeName}=${time}`
  }

  getCurrentRecordTime() {
    return this.findCookie(currentRecordTimeName)
  }

  setIsCountdown(value) {
    document.cookie = `${isCountdownName}=${value ? 'true' : ''}`
  }

  getIsCountdown() {
    return this.findCookie(isCountdownName)
  }

  setIsCounting(value) {
    document.cookie = `${isCountingName}=${value ? 'true' : ''}`
  }

  getStartTime() {
    return this.findCookie(startTimeName)
  }

  setStartTime(time) {
    document.cookie = `${startTimeName}=${time}`
  }

  getIsCounting() {
    return this.findCookie(isCountingName)
  }

  setCountdownInitialTime(time) {
    document.cookie = `${countdownInitialTimeName}=${time}`
  }

  getCountdownInitialTime() {
    return this.findCookie(countdownInitialTimeName)
  }
}

const cookieService = new CookieService()

export default cookieService