import React from 'react'
import PropTypes from 'prop-types'
import Project from './project'

const ProjectList = ({ projects }) => {

  return (
    <div className="relative overflow-x-auto max-x-[95%]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Название
          </th>
          <th scope="col" className="px-6 py-3">
            Тип
          </th>
          <th scope="col" className="px-6 py-3">
            Дата создания
          </th>
          <th scope="col" className="px-6 py-3">
            Затраченное время
          </th>
          <th scope="col" className="px-6 py-3">
            
          </th>
        </tr>
        </thead>
        <tbody>
        {projects.map(p => <Project project={p} key={p._id} />)}
        </tbody>
      </table>
    </div>
  )
}

ProjectList.propTypes = {
  projects: PropTypes.array,
}

export default ProjectList