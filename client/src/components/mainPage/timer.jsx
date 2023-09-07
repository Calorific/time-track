import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import Button from '../common/app/button'

const Timer = ({ start, toggleStart, onTimeChange, time, reset }) => {

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => onTimeChange(), 1000)
      return () => clearInterval(interval)
    }
  }, [start, onTimeChange])

  return (
      <div className='flex justify-between items-center pt-[2px] pb-[2px]'>
        <Button type="submit" text={!start ? 'Старт' : 'Пауза'} onClick={toggleStart} />
        <span className="border border-gray-700 text-3xl align-middle rounded select-none cursor-pointer dark:text-gray-300 font-time"
              onClick={reset}
        >
          {formatTime(time, true)}
        </span>
      </div>

  )
}

Timer.propTypes = {
  start: PropTypes.bool,
  toggleStart: PropTypes.func,
  onTimeChange: PropTypes.func,
  time: PropTypes.number,
  reset: PropTypes.func,
}

export default Timer