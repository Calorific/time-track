import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Badge from '../common/app/badge'
import { formatTime } from '../../utils/formatTime'
import { getProjectTime } from '../../utils/getProjectTime'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectRecords } from '../../store/records'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import ToastUndoDelete from '../common/app/toastUndoDelete'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteProject } from '../../store/projects'
import SuccessButton from '../common/app/successButton'
import DangerButton from '../common/app/dangerButton'

const Project = ({ project }) => {
  const dispatch = useDispatch()
  const records = useSelector(getProjectRecords(project._id))
  const [isDeleting, setIsDeleting] = useState(false)

  const onProjectDelete = () => {
    dispatch(deleteProject(project._id))
  }

  const onCancel = () => {
    setIsDeleting(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    toast(t => <ToastUndoDelete t={t} onDelete={onProjectDelete} onCancel={onCancel} text='Проект удален' />, {
      duration: 5000,
      position: 'bottom-center'
    })
  }

  return (
    <tr className={'bg-white border-b dark:bg-gray-800 dark:border-gray-700 align-baseline ' + (isDeleting ? 'opacity-50' : '') }>
      <th scope="row" className="px-6 py-4 font-medium text-stone-700 text-lg whitespace-nowrap dark:text-stone-200 w-[20%]">
        <NavLink to={`/projects/${project._id}/details`}>{project.title}</NavLink>
      </th>
      <td className="px-6 py-4 w-[20%]">
        <Badge text={project.type} className='!mx-0' />
      </td>
      <td className="px-6 py-4 w-[20%]">
        {new Date(project.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 w-[20%]">
        {formatTime(getProjectTime(records))}
      </td>
      <td className="px-6 py-2 w-[20%] whitespace-nowrap">
        <NavLink to={`/projects/${project._id}/edit`}>
          <SuccessButton className='mr-2'>
            <FontAwesomeIcon icon={faPenToSquare} />
          </SuccessButton>
        </NavLink>
        <DangerButton onClick={handleDelete}>
          <FontAwesomeIcon icon={faXmark} />
        </DangerButton>
      </td>
    </tr>
  )
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project