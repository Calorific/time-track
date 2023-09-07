import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../../utils/formatTime'
import { getProjectTime } from '../../../utils/getProjectTime'
import { useSelector } from 'react-redux'
import { getProjectRecords } from '../../../store/records'
import Badge from './badge'
import { NavLink } from 'react-router-dom'

const ProjectInfo = ({ project, alwaysShow }) => {
  const records = useSelector(getProjectRecords(project?._id))
  const desc = useRef()
  const [show, setShow] = useState(false)
  const [canHide, setCanHide] = useState(!alwaysShow)

  useEffect(() => {
    if (alwaysShow || !project) return

    desc.current.classList.remove('truncate')

    if (desc.current.offsetHeight > 24) {
      desc.current.classList.add('truncate')
      setCanHide(true)
    } else {
      setCanHide(false)
    }
    setShow(false)
  }, [setCanHide, setShow, project, alwaysShow])

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
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex justify-center">
        <NavLink to={`/projects/${project._id}/details`}>{project.title}</NavLink>
        <Badge text={project.type} />
      </h3>
      <p className='dark:text-gray-400 pt-1'>
        На проект потрачено времени: <span className='text-cyan-600 font-time'>{formatTime(getProjectTime(records))}</span>
      </p>
      <p ref={desc} className={'mt-2 text-gray-800 dark:text-gray-300 text-justify ' + (!show && canHide ? 'truncate' : '')}>
        {project.description}
      </p>
      {canHide ? <button className="text-blue-500 underline" onClick={() => setShow(show => !show)}>
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