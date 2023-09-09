export const dateInRange = (date, { startDate, endDate }) => {
  if (!startDate || !endDate)
    return true

  const ms = new Date(date).getTime()
  const min = new Date(startDate).setHours(0,0,0,0)
  const max = new Date(endDate).setHours(23,59,59,999)

  return ms >= min && ms <= max
}