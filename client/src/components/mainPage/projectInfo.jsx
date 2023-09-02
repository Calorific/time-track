import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import { getProjectTime } from '../../utils/getProjectTime'
import { useSelector } from 'react-redux'
import { getProjectRecords } from '../../store/records'
import Badge from '../common/app/badge'
import { NavLink } from 'react-router-dom'

const ProjectInfo = ({ project, alwaysShow }) => {
  const records = useSelector(getProjectRecords(project?._id))
  const [show, setShow] = useState(false)

  if (!project)
    return (
      <div className="px-4 md:px-5 py-2 md:py-3">
        <p className="mt-2 text-gray-800 dark:text-gray-400">
          Вы еще не выбрали проект
        </p>
      </div>
    )

  return (
    <div className="px-4 md:px-5 py-2 md:py-3">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white flex justify-center">
        <NavLink to={`/projects/${project.id}/details`}>{project.title}</NavLink>
        <Badge text={project.type} />
      </h3>
      <p className='dark:text-gray-400 '>
        На проект потрачено времени: {formatTime(getProjectTime(records))}
      </p>
      <p className={'mt-2 text-gray-800 dark:text-gray-400 text-justify ' + (!show && !alwaysShow ? 'truncate' : '')}>
        {project.description}
      </p>
      {!alwaysShow ? <button className="text-blue-500 underline" onClick={() => setShow(show => !show)}>
        {!show ? 'Показать' : 'Скрыть'}
      </button> : ''}
    </div>
  )
}

ProjectInfo.propTypes = {
  project: PropTypes.object,
  alwaysShow: PropTypes.bool,
}

export default ProjectInfo