import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SwitchField from '../common/form/switchField'
import Timer from './timer'
import Countdown from './countdown'
import cookieService from '../../services/cookie.service'

const   RecordTime = ({ onTimeChange, time }) => {
  const [isCountdown, setIsCountdown] = useState(cookieService.getIsCountdown() === 'true')
  const [start, setStart] = useState(cookieService.getIsCounting() === 'true')

  const handleChange = data => {
    onTimeChange(true)
    setIsCountdown(data.value)
    cookieService.setIsCountdown(data.value)
    cookieService.setStartTime('')
    cookieService.setCountdownInitialTime('')
  }

  const toggleStart = () => {
    setStart(prevState => {
      cookieService.setIsCounting(!prevState)
      cookieService.setStartTime(!prevState ? Date.now() : '')
      return !prevState
    })
  }

  const reset = () => {
    onTimeChange(true)
    setStart(false)
    cookieService.setCountdownInitialTime('')
  }

  return (
    <div className="px-4 md:px-5 py-2 md:py-3 w-full">
      <SwitchField leftLabel='Таймер' rightLabel='Секундомер' name='recordType' value={isCountdown}
                   onChange={handleChange} disabled={start} />
      {!isCountdown
        ? <Timer {...{ start, toggleStart, onTimeChange, time, reset }} />
        : <Countdown {...{ start, toggleStart, onTimeChange, time, reset }} />
      }
    </div>
  )
}

RecordTime.propTypes = {
  onTimeChange: PropTypes.func,
  time: PropTypes.number,
}

export default RecordTime