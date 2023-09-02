import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ToastUndoDelete = ({ t, onCancel, onDelete, deleteTime }) => {
  const progress = useRef()
  const [time, setTime] = useState(deleteTime)
  const [stop, setStop] = useState(false)

  useEffect(() => {
    progress.current['style']['stroke-dashoffset'] = 0
    if (stop) return
    const interval = setTimeout(() => {
      if (stop)
        return clearTimeout(interval)

      setTime(prevState => {
        if (prevState - 1 < 1 && !stop) {
          setStop(true)
          clearTimeout(interval)
          onDelete()
        }
        return prevState - 1
      })
    }, 1000)

    return () => clearTimeout(interval)
  }, [time, setTime, onDelete, stop, setStop])

  const handleClick = () => {
    setStop(true)
    toast.dismiss(t.id)
    onCancel()
  }

  return (
    <div className='flex items-center relative'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34" className='h-[25px] rotate-[-90deg] w-[25px]'>
        <circle cx="16" cy="16" r="15.9155" fill='none' stroke='#0063eb' strokeWidth='1.8' />
        <circle cx="16" cy="16" r="15.9155" fill='none' stroke='#f9fafb' strokeDasharray='100 100' strokeDashoffset='100'
          strokeLinecap='round' strokeWidth='1.8' className='transition-[stroke-dashoffset] duration-[5000ms] ease-linear' ref={progress} />
      </svg>
      <span className='absolute left-2'>{time}</span>
      <p className='mx-2'>Проект удален</p>
      <button className='text-blue-500 ml-5' onClick={handleClick}>
        <FontAwesomeIcon icon={faRotateLeft} /> Отменить
      </button>
    </div>
  )
}

ToastUndoDelete.defaultProps = {
  deleteTime: 5
}

ToastUndoDelete.propTypes = {
  t: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  deleteTime: PropTypes.number,
}

export default ToastUndoDelete