import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import ToastUndoDelete from '../common/app/toastUndoDelete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { cancelRecordDelete, deleteRecord, deletingRecord } from '../../store/records'
import CardWrapper from '../common/app/cardWrapper'

const Record = ({ record, projectId }) => {
  const dispatch = useDispatch()

  const onRecordDelete = () => {
    dispatch(deleteRecord({ projectId, recordId: record._id }))
  }

  const onCancel = () => {
    dispatch(cancelRecordDelete({ projectId, recordId: record._id }))
  }

  const handleDelete = () => {
    dispatch(deletingRecord({ projectId, recordId: record._id }))
    toast(t => <ToastUndoDelete t={t} onDelete={onRecordDelete} onCancel={onCancel} text='Запись удалена' />, {
      duration: 5000,
    })
  }

  const renderDescription = desc => desc === 'Без описания' ? desc : 'Описание: ' + desc

  if (record.isDeleting)
    return ''

  return <CardWrapper externalClasses='relative w-[250px] !mx-0'>
    <div className='h-full'>
      <div className="bg-gray-100 border-b rounded-t-xl py-1 px-2 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-500 align-middle">
          {new Date(record.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className='py-2 px-4 md:py-3 md:px-5'>
        <p className='dark:text-gray-400'>{renderDescription(record.description)}</p>
        <p className='dark:text-gray-400'>Время: {formatTime(record.timeSpent)}</p>
      </div>
      <FontAwesomeIcon onClick={handleDelete} icon={faXmark} className='absolute right-2 top-1 cursor-pointer text-red-500' />
    </div>
  </CardWrapper>

}

Record.propTypes = {
  record: PropTypes.object,
  projectId: PropTypes.string,
}

export default Record