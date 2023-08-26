import React, { useState } from 'react'
import SwitchField from '../common/form/switchField'
import Timer from './timer'
import Countdown from './countdown'

const   RecordTime = () => {
  const [isCountdown, setIsCountdown] = useState(false)     
  const [start, setStart] = useState(false)
  
  const handleChange = (data) => {
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
        ? <Timer start={start} toggleStart={toggleStart} />
        : <Countdown start={start} toggleStart={toggleStart} />
      }
    </div>
  )
}

export default RecordTime