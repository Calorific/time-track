import React from 'react'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/formatTime'

const ProjectInfo = ({ currentProject }) => {

  if (!currentProject)
    return (
        <div className="px-4 md:px-5 py-2 md:py-3">
          <p className="mt-2 text-gray-800 dark:text-gray-400">
            Вы еще не выбрали проект
          </p>
        </div>
    )

  const getProjectTime = currentProject.records?.reduce((total, r) => total + r.endTime - r.startTime, 0)

  return (
    <div className="px-4 md:px-5 py-2 md:py-3">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center">
        {currentProject.title}
      </h3>
      <p className='dark:text-gray-400'>
        На проект потрачено времени: {formatTime(getProjectTime)}
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