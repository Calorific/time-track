import React from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'
import { getProjectTime } from '../../utils/getProjectTime'
import { useSelector } from 'react-redux'
import { getProjectRecords } from '../../store/records'
import Badge from '../common/app/badge'

const ProjectInfo = ({ currentProject }) => {
  const records = useSelector(getProjectRecords(currentProject?._id))

  if (!currentProject)
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
        {currentProject.title}
        <Badge text={currentProject.type} />
      </h3>
      <p className='dark:text-gray-400'>
        На проект потрачено времени: {formatTime(getProjectTime(records))}
      </p>
      <p className="mt-2 text-gray-800 dark:text-gray-400">
        {currentProject.description}
      </p>
    </div>
  )
}

ProjectInfo.propTypes = {
  currentProject: PropTypes.object,
}

export default ProjectInfo