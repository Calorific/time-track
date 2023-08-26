import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/app/button'
import { formatTime } from '../../utils/formatTime'
import FormComponent from '../common/form/form'
import TextField from '../common/form/textField'
import toast from 'react-hot-toast'

const Countdown = ({ start, toggleStart }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTime(prevState => {
          if (!prevState) {
            toggleStart()
            clearInterval(interval)
            new Audio('/notification.mp3').play().then()
            return 0
          } else {
            return prevState - 1
          }
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [start, toggleStart])

  const handleSubmit = ({ hours, minutes, seconds }) => {
    hours = +hours || 0
    minutes = +minutes || 0
    seconds = +seconds || 0

    if (!start) {
      if (hours + minutes + seconds < 1)
        return toast.error('Вы должны ввести хотя бы одно положительное значение')
      const newTime = hours * 3600 + minutes * 60 + seconds
      if (newTime !== time)
        setTime(newTime)
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
        {formatTime(time, true)}
      </span>
    </div>
  )
}

Countdown.propTypes = {
  start: PropTypes.bool,
  toggleStart: PropTypes.func,
}

export default Countdown