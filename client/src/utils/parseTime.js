export const parseTime = time => {
  if (+time)
    return +time

  const parts = time.split(':').map(Number).reverse()
  return parts[0] + parts[1] * 60 + (parts[2] || 0) * 3600
}