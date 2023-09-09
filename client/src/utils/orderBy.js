export const orderBy = (items, path, order) => {
  const moveNumber = order === 'asc' ? 1 : -1
  return [...items].sort((a, b) => {
    return a[path] > b[path] ? moveNumber : moveNumber * -1
  })
}