import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/app/button'
import { formatTime } from '../../utils/formatTime'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import toast from 'react-hot-toast'
import cookieService from '../../services/cookie.service'
import { playNotification } from '../../utils/playNotification'

const Countdown = ({ start, toggleStart, onTimeChange, time, reset }) => {
  const [initialTime, setInitialTime] = useState(+cookieService.getCountdownInitialTime() || 0)

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        onTimeChange()

        if (time + 1 >= initialTime) {
          clearInterval(interval)
          toggleStart()
          playNotification()
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

  const handleReset = () => {
    setInitialTime(0)
    reset()
  }

  return (
    <div className='flex justify-between items-center w-full gap-x-2'>
      <FormComponent className='sm:flex sm:justify-between sm:flex-row sm:items-center sm:gap-x-2 sm:w-full' onSubmit={handleSubmit} clear={true}>
        <Button type="submit" text={!start ? 'Старт' : 'Пауза'} className='w-[77px]' />
        <TextField name='hours' label='Часы' type='number' className='sm:m-0 my-3 sm:flex-1 w-full' min={0} disabled={start} />
        <TextField name='minutes' label='Минуты' type='number' className='sm:m-0 mb-3 sm:flex-1 w-full' min={0} max={59} disabled={start} />
        <TextField name='seconds' label='Секунды' type='number' className='sm:m-0 mb-3 sm:flex-1 w-full' min={0} max={59} disabled={start} />
      </FormComponent>

      <span className="border border-gray-700 text-3xl align-middle rounded select-none cursor-pointer dark:text-gray-300 font-time"
            onClick={handleReset}
      >
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
  reset: PropTypes.func,
}

export default Countdown