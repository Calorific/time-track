import cookieService from '../services/cookie.service'
import { playNotification } from './playNotification'

export const computeRecordTime = () => {
  const time = +cookieService.getCurrentRecordTime() || 0
  const startTime = +cookieService.getStartTime() || 0
  const initialTime = +cookieService.getCountdownInitialTime() || 0
  const isCountdown = cookieService.getIsCountdown() === 'true'

  if (!startTime)
    return time

  const secondsPassed = Math.round((Date.now() - startTime) / 1000)

  if (isCountdown && secondsPassed >= +cookieService.getCountdownInitialTime()) {
    cookieService.setCurrentRecordTime(initialTime)
    cookieService.setIsCounting(false)
    playNotification()
    return initialTime
  }

  return secondsPassed
}