import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../common/app/badge'
import { formatTime } from '../../utils/formatTime'
import { NavLink } from 'react-router-dom'

const RecordTableItem = ({ record }) => {

  return (
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 align-baseline'>
        <th scope="row" className="px-6 py-4 font-medium text-stone-700 text-lg whitespace-nowrap dark:text-stone-200 w-[20%]">
          <NavLink to={`/projects/${record.projectId}/details`}>{record.projectTitle}</NavLink>
        </th>
        <td className="px-6 py-4 w-[25%]">
          <Badge text={record.type} className='!mx-0' />
        </td>
        <td className="px-6 py-4 w-[25%]">
          {formatTime(record.timeSpent)}
        </td>
        <td className="px-6 py-4 w-[25%]">
          {new Date(record.createdAt).toLocaleString()}
        </td>
      </tr>
  )
}

RecordTableItem.propTypes = {
  record: PropTypes.object,
}

export default RecordTableItem