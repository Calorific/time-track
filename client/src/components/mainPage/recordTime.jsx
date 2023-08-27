import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SwitchField from '../common/form/switchField'
import Timer from './timer'
import Countdown from './countdown'

const   RecordTime = ({ onTimeChange, time }) => {
  const [isCountdown, setIsCountdown] = useState(false)     
  const [start, setStart] = useState(false)
  
  const handleChange = (data) => {
    onTimeChange(true)
    setIsCountdown(data.value)
  }

  const toggleStart = () => {
    setStart(prevState => !prevState)
  }

  return (
    <div className="px-4 md:px-5 py-2 md:py-3 w-full">
      <SwitchField leftLabel='Таймер' rightLabel='Секундомер' name='recordType' value={isCountdown}
                   onChange={handleChange} disabled={start} />
      {!isCountdown
        ? <Timer start={start} toggleStart={toggleStart} onTimeChange={onTimeChange} time={time} />
        : <Countdown start={start} toggleStart={toggleStart} onTimeChange={onTimeChange} time={time} />
      }
    </div>
  )
}

RecordTime.propTypes = {
  onTimeChange: PropTypes.func,
  time: PropTypes.number,
}

export default RecordTime