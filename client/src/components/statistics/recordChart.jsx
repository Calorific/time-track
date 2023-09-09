import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Chart, registerables  } from 'chart.js'
import SwitchField from '../common/form/switchField'
import { useTheme } from '../../hooks/useTheme'
import { getChartOptions } from '../../utils/getChartOptions'
Chart.register(...registerables)

const RecordChart = ({ data, types, projects, records }) => {
  const [isProjects, setIsProjects] = useState(false)
  const [, setChart] = useState(null)
  const theme = useTheme()

  const handleChange = () => {
    setIsProjects(!isProjects)
  }

  useEffect(() => {
    const options = getChartOptions(data, types, isProjects, theme, projects)
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
          <canvas id='recordCanvas'></canvas>
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