import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Badge from '../common/app/badge'
import { formatTime } from '../../utils/formatTime'
import { getProjectTime } from '../../utils/getProjectTime'
import { useDispatch, useSelector } from 'react-redux'
import { getRecords } from '../../store/records'
import Button from '../common/app/button'
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'
import ToastUndoDelete from '../common/app/toastUndoDelete'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteProject } from '../../store/projects'

const Project = ({ project }) => {
  const dispatch = useDispatch()
  const records = useSelector(getRecords())
  const [isDeleting, setIsDeleting] = useState(false)

  const onProjectDelete = () => {
    dispatch(deleteProject(project._id))
  }

  const onCancel = () => {
    setIsDeleting(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    toast(t => <ToastUndoDelete t={t} onDelete={onProjectDelete} onCancel={onCancel} />, {
      duration: 5000,
    })
  }

  return (
    <tr className={'bg-white border-b dark:bg-gray-800 dark:border-gray-700 ' + (isDeleting ? 'opacity-50' : '') } key={project._id}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[20%]">
        <NavLink to={`/projects/${project._id}/details`}>{project.title}</NavLink>
      </th>
      <td className="px-6 py-4 w-[20%]">
        <Badge text={project.type} externalClasses='!mx-0' />
      </td>
      <td className="px-6 py-4 w-[20%]">
        {new Date(project.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 w-[20%]">
        {formatTime(getProjectTime(records[project._id]))}
      </td>
      <td className="px-6 py-2 w-[20%]">
        <NavLink to={`/projects/${project._id}/edit`}>
          <Button bgColor='bg-green-500 hover:bg-green-700' classes='mr-2 my-2'>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </NavLink>

        <Button bgColor='bg-red-500 hover:bg-red-700' classes='m-0' onClick={handleDelete}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </td>
    </tr>
  )
}

Project.propTypes = {
  project: PropTypes.object,
}

export default Project