import cookieService from '../services/cookie.service'

export const computeCurrentRecordTime = () => {
  const time = +cookieService.getCurrentRecordTime() || 0
  const startTime = +cookieService.getStartTime() || 0
  const initialTime = +cookieService.getCountdownInitialTime() || 0
  const isCountdown = !!cookieService.getIsCountdown()

  if (!startTime)
    return time

  const secondsPassed = Math.round((Date.now() - startTime) / 1000)

  if (isCountdown && secondsPassed >= +cookieService.getCountdownInitialTime()) {
    cookieService.setCurrentRecordTime(initialTime)
    cookieService.setIsCounting(false)
    return initialTime
  }

  return secondsPassed
}