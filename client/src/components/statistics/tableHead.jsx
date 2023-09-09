import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const TableHead = ({ onSort, sort }) => {
  const cols = [
    { label: 'Проект', path: 'projectTitle' },
    { label: 'Тип', path: 'type' },
    { label: 'Затраченное время', path: 'timeSpent' },
    { label: 'Дата создания', path: 'createdAt' },
  ]

  return (
    <>
      <tr>
        {cols.map((c, key) => (
          <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => onSort(c.path)} key={key}>
            <span className='mr-1.5'>{c.label}</span>
            {sort.path === c.path && <FontAwesomeIcon icon={sort.order === 'asc' ? faAngleUp : faAngleDown} />}
          </th>
        ))}
      </tr>
    </>
  )
}

TableHead.propTypes = {
  onSort: PropTypes.func,
  sort: PropTypes.object,
}

export default TableHead