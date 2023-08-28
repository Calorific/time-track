const formatValue = t => t < 10 ? '0' + t : t

export const formatTime = (s, alwaysIncludeHours) => {
  if (!+s)
    return alwaysIncludeHours ? '00:00:00' : '00:00'

  const hours = ~~(s / 3600)
  const minutes = ~~((s - hours * 3600) / 60)
  const seconds = s - hours * 3600 - minutes * 60

  if (!alwaysIncludeHours)
    return `${hours ? hours + ':' : ''}${formatValue(minutes)}:${formatValue(seconds)}`

  return `${formatValue(hours)}:${formatValue(minutes)}:${formatValue(seconds)}`
}