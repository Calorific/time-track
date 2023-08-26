import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import Button from '../common/app/button'

const Timer = ({ start, toggleStart }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => setTime(prevState => prevState + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [start])

  return (
      <div className='flex justify-between items-center pt-[2.5px]'>
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
}

export default Timer