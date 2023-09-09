import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getRecords } from '../store/records'
import RecordChart from '../components/statistics/recordChart'
import { getProjectsList } from '../store/projects'
import Datepicker from 'react-tailwindcss-datepicker'
import { transformRecords } from '../utils/transformRecords'
import { getProjectTypes } from '../store/user'
import { dateInRange } from '../utils/dateInRange'
import RecordTable from '../components/statistics/recordTable'

const StatisticsPage = () => {
  const types = useSelector(getProjectTypes())
  const projects = useSelector(getProjectsList())
  const records = useSelector(getRecords())
  const data = transformRecords(projects, records)

  const [dateRange, setDateRange] = useState({
    startDate: new Date() - 7 * 24 * 3600 * 1000,
    endDate: new Date()
  })

  const handleChange = value => {
    setDateRange(value)
  }

  const filteredData = data.filter(r => dateInRange(r.createdAt, dateRange))
  return (
    <div className='p-5'>
      <div className='flex justify-end'>
        <div className='w-72 sm:w-80'>
          <Datepicker value={dateRange} onChange={handleChange} i18n='ru' separator='-' displayFormat='DD/MM/YYYY'
                      useRange={false} maxDate={new Date()} popoverDirection='down' />
        </div>
      </div>
      {filteredData.length
          ? <RecordChart data={filteredData} types={types} records={records} projects={projects} />
          : <p className="text-center text-gray-900 dark:text-gray-200 mt-8 ml-8 min-h-[350px]">За этот период у вас нет записей</p>}
      {filteredData.length ? <RecordTable records={filteredData} types={types} /> : '' }
    </div>
  )
}

export default StatisticsPage