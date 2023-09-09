import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RecordTableItem from './recordTableItem'
import Divider from '../common/app/divider'
import SelectField from '../common/form/selectField'
import { getProjectTime } from '../../utils/getProjectTime'
import { formatTime } from '../../utils/formatTime'
import { orderBy } from '../../utils/orderBy'
import TableHead from './tableHead'

const RecordTable = ({ records, types }) => {
  const options = ['Любой', ...types].map(t => ({ value: t, label: t }))
  const [filterType, setFilterType] = useState(options[0])
  const [sort, setSort] = useState({ path: 'createdAt', order: 'desc' })
  const filteredRecords = filterType.value !== 'Любой' ? records.filter(r => r.type === filterType.value) : records
  const sortedRecords = orderBy(filteredRecords, sort.path, sort.order)

  const onSort = path => {
    setSort(prevState => {
      if (prevState.path === path)
        return { path, order: prevState.order === 'asc' ? 'desc' : 'asc'}
      return { path, order: 'desc' }
    })
  }

  return (
    <div className="relative overflow-x-auto w-11/12 mt-5 pt-2 mx-auto">
      <div className='flex gap-6 items-center flex-wrap mb-2'>
        <SelectField name='typeSelect' value={filterType} options={options} onChange={value => setFilterType(value)}
                     label='Тип' classes='max-w-[230px]' />
        <p className="text-base text-gray-900 dark:text-gray-200">
          Общее время: {formatTime(getProjectTime(filteredRecords))}
        </p>
      </div>

      <Divider />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <TableHead onSort={onSort} sort={sort} />
        </thead>
        <tbody>
        {sortedRecords.map(r => <RecordTableItem record={r} key={r._id} />)}
        </tbody>
      </table>
    </div>
  )
}

RecordTable.propTypes = {
  records: PropTypes.array,
  types: PropTypes.array,
}

export default RecordTable