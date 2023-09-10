import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SwitchField from '../common/form/switchField'
import { useTheme } from '../../hooks/useTheme'
import { getChartOptions } from '../../utils/getChartOptions'
import { Chart, registerables  } from 'chart.js'
Chart.register(...registerables)

const RecordChart = ({ data, types, projects, records }) => {
  const [isProjects, setIsProjects] = useState(false)
  const [, setChart] = useState(null)
  const [isZero, setIsZero] = useState(false)
  const theme = useTheme()

  const handleChange = () => {
    setIsProjects(!isProjects)
  }

  useEffect(() => {
    const options = getChartOptions(data, types, isProjects, theme, projects)
    setIsZero(!options.data.datasets[0].data.some(x => x > 0))

    const newChart = new Chart('recordCanvas', options)
    setChart(newChart)
    newChart.update('none')
    return () => newChart.destroy()
  }, [data, types, isProjects, theme, projects])

  return (
    <div className='w-full flex justify-center'>
      <div className='w-72 sm:w-96'>
        <SwitchField name='chartType' leftLabel='По типам' rightLabel='По проектам' value={isProjects} onChange={handleChange} />
        <div>
          {isZero ? <p className="text-base text-gray-900 dark:text-white mt-8 ml-8">
            По заданным фильтрам отсутствуют данные
          </p> : ''}
          <canvas id="recordCanvas"></canvas>
        </div>
      </div>
    </div>
  )
}

RecordChart.propTypes = {
  data: PropTypes.array,
  types: PropTypes.array,
  projects: PropTypes.array,
  records: PropTypes.object,
}

export default React.memo(RecordChart)