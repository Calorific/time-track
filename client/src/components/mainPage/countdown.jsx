import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/app/button'
import { formatTime } from '../../utils/formatTime'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import toast from 'react-hot-toast'
import cookieService from '../../services/cookie.service'

const Countdown = ({ start, toggleStart, onTimeChange, time }) => {
  const [initialTime, setInitialTime] = useState(+cookieService.getCountdownInitialTime())

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        onTimeChange()

        if (time + 1 === initialTime) {
          clearInterval(interval)
          toggleStart()
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [start, onTimeChange, time, initialTime, toggleStart])

  const handleSubmit = ({ hours, minutes, seconds }) => {
    hours = +hours || 0
    minutes = +minutes || 0
    seconds = +seconds || 0

    if (!start) {
      if (hours + minutes + seconds < 1 && !time)
        return toast.error('Вы должны ввести хотя бы одно положительное значение')

      const newTime = hours * 3600 + minutes * 60 + seconds

      if (newTime !== initialTime - time && newTime) {
        setInitialTime(newTime)
        cookieService.setCountdownInitialTime(newTime)
        onTimeChange(true)
      }
    }

    toggleStart()
  }

  return (
    <div className='flex justify-between items-center w-full gap-x-2'>
      <FormComponent classes='sm:flex sm:justify-between sm:flex-row sm:items-center sm:gap-x-2' onSubmit={handleSubmit}>
        <Button type="submit" text={!start ? 'Старт' : 'Пауза'} />
        <TextField name='hours' placeholder='Часы' type='number' classes='sm:m-0 my-4 sm:flex-1 w-full' min={0} disabled={start} />
        <TextField name='minutes' placeholder='Минуты' type='number' classes='sm:m-0 mb-4 sm:flex-1 w-full' min={0} max={59} disabled={start} />
        <TextField name='seconds' placeholder='Секунды' type='number' classes='sm:m-0 mb-4 sm:flex-1 w-full' min={0} max={59} disabled={start} />
      </FormComponent>

      <span className="border border-gray-700 text-3xl align-middle rounded" style={{ fontFamily: 'Lato, sans-serif' }}>
        {formatTime(initialTime - time, true)}
      </span>
    </div>
  )
}

Countdown.propTypes = {
  start: PropTypes.bool,
  toggleStart: PropTypes.func,
  onTimeChange: PropTypes.func,
  time: PropTypes.number,
}

export default Countdown