export const getProjectTime = records => records?.reduce((total, r) => total + r.timeSpent, 0) || 0
