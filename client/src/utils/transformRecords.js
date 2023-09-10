export const transformRecords = (projects, records) => {
  return projects.reduce((acc, p) => {
    return [...acc, ...(records[p._id] || []).map(r => ({ ...r, type: p.type, projectId: p._id, projectTitle: p.title }))]
  }, [])
}