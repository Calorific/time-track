import { formatTime } from './formatTime'
import { Chart } from 'chart.js'

const transformData = (isProjects, types, data, projects) => {
  if (!isProjects)
    return types.map(type => data.reduce((time, r) => r.type === type ? time + r.timeSpent : time, 0))

  const temp = {}
  data.forEach(r => temp[r.projectId] ? temp[r.projectId] += r.timeSpent : temp[r.projectId] = r.timeSpent)
  return projects.map(p => temp[p._id] || 0)
}

export const getChartOptions = (data, types, isProjects, theme, projects) => {
  return {
    type: 'pie',
    data: {
      labels: !isProjects ? types : projects.map(p => p.title),
      datasets: [
        {
          label: 'Затраченное время',
          data: transformData(isProjects, types, data, projects),
          backgroundColor: [
            'rgba(245, 158, 11, 0.2)',
            'rgba(16, 185, 129, 0.2)',
            'rgba(20, 184, 168, 0.2)',
            'rgba(13, 71, 161, 0.2)',
            'rgba(255, 87, 34, 0.2)',
            'rgba(239, 68, 68, 0.2)',
            'rgba(63, 81, 181, 0.2)'
          ],
          borderColor: [
            'rgba(245, 158, 11, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(20, 184, 168, 1)',
            'rgba(13, 71, 161, 1)',
            'rgba(255, 87, 34, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(63, 81, 181, 1)'
          ],
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: data => `Затраченное время: ${formatTime(data.parsed)}`,
          }
        },
        legend: {
          display: true,
          labels: {
            color: theme === 'dark' ? '#e5e7eb' : Chart.defaults.color
          }
        }
      }
    }
  }
}