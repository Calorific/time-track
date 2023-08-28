import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import Button from '../common/app/button'

const Timer = ({ start, toggleStart, onTimeChange, time }) => {

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => onTimeChange(), 1000)
      return () => clearInterval(interval)
    }
  }, [start, onTimeChange])

  return (
      <div className='flex justify-between items-center pt-[2.5px] mb-[3px]'>
        <Button type="submit" text={!start ? 'Старт' : 'Пауза'} onClick={toggleStart} />
        <span className="border border-gray-700 text-3xl align-middle rounded" style={{ fontFamily: 'Lato, sans-serif' }}>
          {formatTime(time, true)}
        </span>
      </div>

  )
}

Timer.propTypes = {
  start: PropTypes.bool,
  toggleStart: PropTypes.func,
  onTimeChange: PropTypes.func,
}

export default Timer